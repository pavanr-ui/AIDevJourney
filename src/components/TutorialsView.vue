<script setup>
import { ref, computed } from 'vue';
import { roadmapData } from '../data/roadmap';
import { state } from '../store';
import {
  GraduationCap,
  Search,
  BookOpen,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-vue-next';

const emit = defineEmits(['open-tutorial']);

const selectedPhase = ref(0); // 0 = All
const filterType = ref('all'); // all, bookmarked, completed, pending
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

const allTutorials = computed(() => {
  let list = [];
  roadmapData.forEach(phase => {
    if (selectedPhase.value === 0 || phase.phase === selectedPhase.value) {
      phase.days.forEach(day => {
        const prog = state.tutorialProgress[day.day] || { completed: false, bookmarked: false };
        list.push({
          ...day,
          phaseNum: phase.phase,
          phaseTitle: phase.title,
          completed: prog.completed,
          bookmarked: prog.bookmarked,
          quizScore: prog.quizScore
        });
      });
    }
  });

  if (filterType.value === 'bookmarked') {
    list = list.filter(t => t.bookmarked);
  } else if (filterType.value === 'completed') {
    list = list.filter(t => t.completed);
  } else if (filterType.value === 'pending') {
    list = list.filter(t => !t.completed);
  }

  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(t =>
      t.topic.toLowerCase().includes(q) ||
      t.day.toString().includes(q) ||
      (t.concepts && t.concepts.some(c => c.toLowerCase().includes(q)))
    );
  }

  return list;
});

const tutorialStats = computed(() => {
  let started = 0;
  let completed = 0;
  let bookmarked = 0;
  Object.keys(state.tutorialProgress).forEach(day => {
    const p = state.tutorialProgress[day];
    if (p.completed) completed++;
    if (p.completed || (p.notes && p.notes.length > 0)) started++;
    if (p.bookmarked) bookmarked++;
  });
  return { started, completed, bookmarked };
});
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <GraduationCap class="w-7 h-7 text-brand-500" />
          <span>Learning Tutorials (60 Days)</span>
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Comprehensive in-app tutorials with code examples, exercises, quizzes, and interview questions for all 60 days.</p>
      </div>

      <!-- Search Bar -->
      <div class="relative w-full md:w-80">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search tutorials by topic or day #..."
          class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 shadow-sm"
        />
      </div>
    </div>

    <!-- Quick Stats Bar -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500">Tutorials Completed</p>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ tutorialStats.completed }} / 60</h3>
        </div>
        <div class="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-lg">
          <CheckCircle2 class="w-5 h-5" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500">Bookmarked Lessons</p>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ tutorialStats.bookmarked }}</h3>
        </div>
        <div class="p-3 bg-amber-50 dark:bg-amber-950 text-amber-600 rounded-lg">
          <Bookmark class="w-5 h-5" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500">Study Progress</p>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ Math.round((tutorialStats.completed / 60) * 100) }}%</h3>
        </div>
        <div class="p-3 bg-brand-50 dark:bg-brand-950 text-brand-600 rounded-lg">
          <Award class="w-5 h-5" />
        </div>
      </div>
    </div>

    <!-- Phase Selector & Filter -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          v-for="p in phases"
          :key="p.id"
          @click="selectedPhase = p.id"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0',
            selectedPhase === p.id
              ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-brand-300'
          ]"
        >
          {{ p.name }}
        </button>
      </div>

      <div class="flex items-center gap-1 bg-white dark:bg-gray-900 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
        <button
          v-for="f in [
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'completed', label: 'Completed' },
            { id: 'bookmarked', label: 'Bookmarked' }
          ]"
          :key="f.id"
          @click="filterType = f.id"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            filterType === f.id
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          ]"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <!-- Tutorials Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="tut in allTutorials"
        :key="tut.day"
        @click="emit('open-tutorial', tut.day)"
        class="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-500 transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              Day {{ tut.day }} • Phase {{ tut.phaseNum }}
            </span>
            <div class="flex items-center gap-2">
              <Bookmark v-if="tut.bookmarked" class="w-4 h-4 text-amber-500 fill-amber-500" />
              <CheckCircle2 v-if="tut.completed" class="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors mb-2 line-clamp-1">
            {{ tut.topic }}
          </h3>

          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {{ tut.expectedOutcome || 'Complete 15-point tutorial, interactive code, exercises, and quiz.' }}
          </p>
        </div>

        <div class="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
          <span>Read Tutorial & Practice &rarr;</span>
          <span class="text-[11px] text-gray-400 font-normal">4h lesson</span>
        </div>
      </div>
    </div>
  </div>
</template>
