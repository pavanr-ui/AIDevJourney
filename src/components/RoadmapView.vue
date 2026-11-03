<script setup>
import { ref, computed } from 'vue';
import { roadmapData } from '../data/roadmap';
import { state } from '../store';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-vue-next';

const emit = defineEmits(['open-day']);

const selectedPhase = ref(0); // 0 = All phases, 1-6 = Specific phase
const statusFilter = ref('all'); // all, completed, in-progress, pending
const searchQuery = ref('');

const phases = [
  { id: 0, name: "All Phases" },
  { id: 1, name: "Phase 1: Python Fundamentals" },
  { id: 2, name: "Phase 2: AI & LLM Fundamentals" },
  { id: 3, name: "Phase 3: AI Coding & Automation" },
  { id: 4, name: "Phase 4: Build First AI Agent" },
  { id: 5, name: "Phase 5: Advanced AI Agents" },
  { id: 6, name: "Phase 6: Final Portfolio Project" }
];

const filteredDays = computed(() => {
  let list = [];
  roadmapData.forEach(phase => {
    if (selectedPhase.value === 0 || phase.phase === selectedPhase.value) {
      phase.days.forEach(day => {
        list.push({ ...phaseDataWithStatus(day, phase.phase) });
      });
    }
  });

  if (statusFilter.value !== 'all') {
    list = list.filter(item => {
      if (statusFilter.value === 'completed') return item.status === 'Completed';
      if (statusFilter.value === 'in-progress') return item.status === 'In Progress';
      if (statusFilter.value === 'pending') return item.status === 'Not Started';
      return true;
    });
  }

  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(item =>
      item.topic.toLowerCase().includes(q) ||
      item.day.toString().includes(q) ||
      item.concepts.some(c => c.toLowerCase().includes(q))
    );
  }

  return list;
});

const phaseDataWithStatus = (day, phaseNum) => {
  const status = state.dayStatuses[day.day] || 'Not Started';
  const tasks = day.tasks || [];
  const completedTasks = tasks.filter(t => state.dayTasks[day.day]?.[t.id]).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const hasNotes = Boolean(state.dayNotes[day.day] && state.dayNotes[day.day].trim().length > 0);

  return {
    ...day,
    phaseNum,
    status,
    completedTasks,
    totalTasks: tasks.length,
    progress,
    hasNotes
  };
};
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Header & Search -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">60-Day Learning Roadmap</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Master Python, LLMs, LangGraph, and build production AI agents.</p>
      </div>

      <!-- Search Bar -->
      <div class="relative w-full md:w-72">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search topic or concept..."
          class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>
    </div>

    <!-- Phase Selector Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        v-for="p in phases"
        :key="p.id"
        @click="selectedPhase = p.id"
        :class="[
          'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0',
          selectedPhase === p.id
            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
            : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-brand-300'
        ]"
      >
        {{ p.name }}
      </button>
    </div>

    <!-- Status Filter Bar -->
    <div class="flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        <Filter class="w-4 h-4" />
        <span>Filter Status:</span>
      </div>
      <div class="flex items-center gap-1.5">
        <button
          v-for="st in [
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Not Started' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' }
          ]"
          :key="st.id"
          @click="statusFilter = st.id"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            statusFilter === st.id
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          ]"
        >
          {{ st.label }}
        </button>
      </div>
    </div>

    <!-- Days Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="day in filteredDays"
        :key="day.day"
        @click="emit('open-day', day.day)"
        class="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-500 dark:hover:border-brand-500 transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              Day {{ day.day }} • Phase {{ day.phaseNum }}
            </span>
            <span
              :class="[
                'px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1',
                day.status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' :
                day.status === 'In Progress' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' :
                'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              ]"
            >
              <CheckCircle2 v-if="day.status === 'Completed'" class="w-3.5 h-3.5" />
              <Clock v-else-if="day.status === 'In Progress'" class="w-3.5 h-3.5" />
              <span>{{ day.status }}</span>
            </span>
          </div>

          <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2 line-clamp-1">
            {{ day.topic }}
          </h3>

          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {{ day.expectedOutcome }}
          </p>

          <!-- Concepts tags -->
          <div class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="(concept, idx) in day.concepts.slice(0, 3)"
              :key="idx"
              class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] rounded-md font-medium"
            >
              {{ concept }}
            </span>
          </div>
        </div>

        <div>
          <!-- Progress bar -->
          <div class="space-y-1.5 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">Tasks: {{ day.completedTasks }}/{{ day.totalTasks }}</span>
              <span class="font-semibold text-gray-900 dark:text-white">{{ day.progress }}%</span>
            </div>
            <div class="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div
                class="bg-brand-500 h-full rounded-full transition-all duration-300"
                :style="{ width: `${day.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
