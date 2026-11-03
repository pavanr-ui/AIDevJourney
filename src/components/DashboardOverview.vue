<script setup>
import { computed } from 'vue';
import { state, stats, actions } from '../store';
import { roadmapData } from '../data/roadmap';
import {
  CheckCircle2,
  Clock,
  Flame,
  Award,
  BookOpen,
  FolderKanban,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Layers
} from 'lucide-vue-next';

const emit = defineEmits(['navigate', 'open-day', 'open-projects']);

const nextDayNum = computed(() => actions.getNextIncompleteDay());
const nextDayData = computed(() => {
  const allDays = roadmapData.flatMap(p => p.days);
  return allDays.find(d => d.day === nextDayNum.value) || allDays[0];
});

const phaseProgressList = computed(() => {
  return roadmapData.map(phase => {
    const totalDays = phase.days.length;
    const completedDays = phase.days.filter(d => state.dayStatuses[d.day] === 'Completed').length;
    const percentage = Math.round((completedDays / totalDays) * 100);
    return {
      ...phase,
      totalDays,
      completedDays,
      percentage
    };
  });
});
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Welcome Banner -->
    <div class="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-700 to-accent-700 rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-brand-500/10">
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div class="relative z-10 max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-xs font-medium mb-4 text-white">
          <span>60-Day AI Agent Developer Roadmap</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Active Journey</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          Welcome back, Pavan Ramshetty! 🚀
        </h2>
        <p class="text-brand-100 text-sm md:text-base leading-relaxed mb-6">
          You are on Day {{ nextDayNum }} of your AI Agent Developer journey. Master Python, LLMs, LangGraph, and build production-ready AI agents with AI coding assistance.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <button
            @click="emit('open-day', nextDayNum)"
            class="px-5 py-2.5 bg-white text-brand-700 hover:bg-brand-50 rounded-xl font-semibold text-sm shadow-lg shadow-black/10 flex items-center gap-2 transition-transform transform active:scale-95"
          >
            <PlayCircle class="w-4 h-4 text-brand-600" />
            <span>Continue Day {{ nextDayNum }}: {{ nextDayData.topic }}</span>
          </button>
          <button
            @click="emit('navigate', 'roadmap')"
            class="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-semibold text-sm backdrop-blur-md transition-colors flex items-center gap-2"
          >
            <span>View Full Roadmap</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Stat 1 -->
      <div class="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Overall Progress</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.overallCompletionPercentage }}%</h3>
          <p class="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 class="w-3.5 h-3.5" />
            <span>{{ stats.completedTasks }}/{{ stats.totalTasks }} Tasks</span>
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
          <TrendingUp class="w-6 h-6" />
        </div>
      </div>

      <!-- Stat 2 -->
      <div class="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Completed Days</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.completedDays }} <span class="text-sm font-normal text-gray-400">/ 60</span></h3>
          <p class="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
            {{ stats.pendingDays }} Days Pending
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Award class="w-6 h-6" />
        </div>
      </div>

      <!-- Stat 3 -->
      <div class="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Study Hours</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalLearningHours }}h</h3>
          <p class="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium flex items-center gap-1">
            <Flame class="w-3.5 h-3.5" />
            <span>{{ state.streakCount }} Day Streak</span>
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <Clock class="w-6 h-6" />
        </div>
      </div>

      <!-- Stat 4 -->
      <div class="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between cursor-pointer hover:border-brand-500 transition-colors" @click="emit('open-projects')">
        <div>
          <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">AI Projects</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.completedProjects }} <span class="text-sm font-normal text-gray-400">/ 3</span></h3>
          <p class="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium flex items-center gap-1">
            <span>View Tracker</span>
            <ArrowRight class="w-3 h-3" />
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
          <FolderKanban class="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Phase-wise Progress Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Layers class="w-5 h-5 text-brand-500" />
          <span>Roadmap Phases</span>
        </h3>
        <button @click="emit('navigate', 'roadmap')" class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          View All Days &rarr;
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="phase in phaseProgressList"
          :key="phase.phase"
          @click="emit('navigate', 'roadmap')"
          class="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-500 dark:hover:border-brand-500 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                Phase {{ phase.phase }}
              </span>
              <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {{ phase.completedDays }}/{{ phase.totalDays }} Days
              </span>
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
              {{ phase.title }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              Days {{ phase.days[0].day }}–{{ phase.days[phase.days.length - 1].day }}: Covering core fundamentals, hands-on practical tasks, and projects.
            </p>
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-medium">
              <span class="text-gray-500">Progress</span>
              <span class="text-gray-900 dark:text-white font-bold">{{ phase.percentage }}%</span>
            </div>
            <div class="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                class="bg-gradient-to-r from-brand-500 to-accent-500 h-full rounded-full transition-all duration-500"
                :style="{ width: `${phase.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
