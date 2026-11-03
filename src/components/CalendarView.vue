<script setup>
import { computed } from 'vue';
import { roadmapData } from '../data/roadmap';
import { state } from '../store';
import { Calendar, CheckCircle2, Clock, Circle } from 'lucide-vue-next';

const emit = defineEmits(['open-day']);

const allDays = computed(() => {
  return roadmapData.flatMap(p => {
    return p.days.map(d => ({
      ...d,
      phaseNum: p.phase,
      status: state.dayStatuses[d.day] || 'Not Started'
    }));
  });
});
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Calendar class="w-6 h-6 text-brand-500" />
        <span>Timeline & Calendar View</span>
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Visual overview of your 60-day learning progress across all 6 phases.</p>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-medium">
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
        <span class="text-gray-700 dark:text-gray-300">Completed</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-amber-500"></span>
        <span class="text-gray-700 dark:text-gray-300">In Progress</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></span>
        <span class="text-gray-700 dark:text-gray-300">Not Started</span>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
      <div
        v-for="day in allDays"
        :key="day.day"
        @click="emit('open-day', day.day)"
        :class="[
          'aspect-square rounded-xl p-2 flex flex-col justify-between cursor-pointer transition-all border text-left group',
          day.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' :
          day.status === 'In Progress' ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300' :
          'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-brand-500 text-gray-700 dark:text-gray-300'
        ]"
        :title="`Day ${day.day}: ${day.topic}`"
      >
        <div class="flex justify-between items-start">
          <span class="text-xs font-bold">D{{ day.day }}</span>
          <CheckCircle2 v-if="day.status === 'Completed'" class="w-3.5 h-3.5 text-emerald-500" />
          <Clock v-else-if="day.status === 'In Progress'" class="w-3.5 h-3.5 text-amber-500" />
          <Circle v-else class="w-3.5 h-3.5 text-gray-300 dark:text-gray-700" />
        </div>
        <div class="text-[9px] font-medium truncate opacity-80 group-hover:opacity-100">
          {{ day.topic }}
        </div>
      </div>
    </div>
  </div>
</template>
