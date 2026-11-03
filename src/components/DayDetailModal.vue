<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { state, actions } from '../store';
import { roadmapData } from '../data/roadmap';
import {
  X,
  CheckSquare,
  Square,
  BookOpen,
  Target,
  FileText,
  Clock,
  Save,
  ExternalLink,
  ChevronLeft
} from 'lucide-vue-next';

const props = defineProps({
  dayNum: Number
});
const emit = defineEmits(['close']);

const dayData = computed(() => {
  const allDays = roadmapData.flatMap(p => p.days);
  return allDays.find(d => d.day === props.dayNum);
});

const dayStatus = computed({
  get: () => state.dayStatuses[props.dayNum],
  set: (val) => actions.setDayStatus(props.dayNum, val)
});

const dayNotes = ref(state.dayNotes[props.dayNum] || '');
const studyHours = ref(state.studyHours[props.dayNum] || 0);

// Auto-save notes and hours
const saveChanges = () => {
  actions.saveNote(props.dayNum, dayNotes.value);
  actions.logHours(props.dayNum, studyHours.value);
};

watch([dayNotes, studyHours], saveChanges);
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800">
      <!-- Modal Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div class="flex items-center gap-3">
          <button @click="emit('close')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Day {{ dayData.day }}: {{ dayData.topic }}</h2>
        </div>
        <select v-model="dayStatus" class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium border-none focus:ring-0">
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button @click="emit('close')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="overflow-y-auto p-6 space-y-8">
        <!-- Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <Target class="w-5 h-5" /> Objectives
            </h3>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li v-for="obj in dayData.objectives" :key="obj">{{ obj }}</li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3 class="font-bold flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <BookOpen class="w-5 h-5" /> Concepts
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="c in dayData.concepts" :key="c" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">{{ c }}</span>
            </div>
          </div>
        </div>

        <!-- Checklist -->
        <div class="space-y-4">
          <h3 class="font-bold flex items-center gap-2 text-brand-600 dark:text-brand-400">
            <CheckSquare class="w-5 h-5" /> Tasks
          </h3>
          <div class="space-y-2">
            <button
              v-for="task in dayData.tasks"
              :key="task.id"
              @click="actions.toggleTask(dayNum, task.id)"
              class="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors text-left text-sm"
            >
              <CheckSquare v-if="state.dayTasks[dayNum]?.[task.id]" class="w-5 h-5 text-brand-500" />
              <Square v-else class="w-5 h-5 text-gray-400" />
              <span :class="{'line-through text-gray-400': state.dayTasks[dayNum]?.[task.id]}">{{ task.text }}</span>
            </button>
          </div>
        </div>

        <!-- Notes Editor & Resources -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <FileText class="w-5 h-5" /> Personal Notes
            </h3>
            <textarea
              v-model="dayNotes"
              placeholder="Write your notes, code snippets, doubts here..."
              class="w-full h-48 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            ></textarea>
          </div>
          <div class="space-y-4">
            <h3 class="font-bold flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <ExternalLink class="w-5 h-5" /> Resources
            </h3>
            <div class="space-y-2">
              <a
                v-for="res in dayData.resources"
                :key="res.url"
                :href="res.url"
                target="_blank"
                class="block p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-brand-50 dark:hover:bg-brand-950/30 text-sm transition-colors text-brand-600 dark:text-brand-400 flex items-center gap-2"
              >
                {{ res.label }} <ExternalLink class="w-3 h-3 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <Clock class="w-4 h-4" />
          <input type="number" v-model="studyHours" class="w-16 p-1 rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-center" /> hours studied
        </div>
        <button @click="emit('close')" class="px-5 py-2 bg-brand-600 text-white rounded-xl font-medium text-sm">Close</button>
      </div>
    </div>
  </div>
</template>
