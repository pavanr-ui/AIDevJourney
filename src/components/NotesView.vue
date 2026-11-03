<script setup>
import { ref, computed } from 'vue';
import { state } from '../store';
import { roadmapData } from '../data/roadmap';
import { Search, BookOpen, Calendar, Edit3, ArrowRight, FileText } from 'lucide-vue-next';

const emit = defineEmits(['open-day']);

const searchQuery = ref('');

const allNotes = computed(() => {
  const notesList = [];
  const allDays = roadmapData.flatMap(p => p.days);

  allDays.forEach(day => {
    const noteText = state.dayNotes[day.day];
    if (noteText && noteText.trim().length > 0) {
      notesList.push({
        day: day.day,
        topic: day.topic,
        text: noteText,
        updatedAt: 'Saved in LocalStorage'
      });
    }
  });

  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase();
    return notesList.filter(n =>
      n.text.toLowerCase().includes(q) ||
      n.topic.toLowerCase().includes(q) ||
      n.day.toString().includes(q)
    );
  }

  return notesList;
});
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen class="w-6 h-6 text-brand-500" />
          <span>My Personal Notes</span>
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Search and review all your code snippets, concepts, and personal notes recorded across the 60 days.</p>
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search notes by keyword or Day #..."
          class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 shadow-sm"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="allNotes.length === 0" class="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800">
      <div class="w-16 h-16 mx-auto rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center mb-4">
        <FileText class="w-8 h-8" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
        {{ searchQuery ? 'No notes matched your search' : 'No personal notes recorded yet' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
        {{ searchQuery ? 'Try searching for a different keyword or Day number.' : 'Open any day from the 60-Day Roadmap to add code snippets, concepts, questions, or doubts.' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="emit('open-day', 1)"
        class="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-brand-500/20 inline-flex items-center gap-2"
      >
        <span>Open Day 1 & Start Writing Notes</span>
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>

    <!-- Notes List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="note in allNotes"
        :key="note.day"
        class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-brand-500 transition-colors group"
      >
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              Day {{ note.day }}
            </span>
            <button
              @click="emit('open-day', note.day)"
              class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <Edit3 class="w-3.5 h-3.5" />
              <span>Edit Note</span>
            </button>
          </div>

          <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors">
            {{ note.topic }}
          </h3>

          <div class="bg-gray-50 dark:bg-gray-950 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
            {{ note.text }}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[11px] text-gray-400">
          <span>Saved in LocalStorage</span>
          <button @click="emit('open-day', note.day)" class="text-brand-500 hover:underline">
            View Day Details &rarr;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
