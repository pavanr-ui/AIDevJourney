<script setup>
import { ref, computed } from 'vue';
import { state, actions, stats } from '../store';
import {
  LayoutDashboard,
  Map,
  GraduationCap,
  BookOpen,
  FolderKanban,
  BookmarkCheck,
  Calendar,
  Sun,
  Moon,
  Flame,
  Menu,
  X,
  Download,
  RotateCcw,
  Sparkles,
  Clock,
  MessageSquare,
  LogOut
} from 'lucide-vue-next';

const props = defineProps({
  currentTab: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['navigate', 'open-continue', 'open-reset', 'logout']);

const isMobileMenuOpen = ref(false);

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'roadmap', label: '60-Day Roadmap', icon: Map },
  { id: 'tutorials', label: 'Learning Tutorials', icon: GraduationCap },
  { id: 'chat', label: 'AI Learning Assistant', icon: MessageSquare },
  { id: 'notes', label: 'My Notes', icon: BookOpen },
  { id: 'projects', label: 'AI Projects', icon: FolderKanban },
  { id: 'resources', label: 'Free Resources', icon: BookmarkCheck },
  { id: 'calendar', label: 'Timeline View', icon: Calendar },
];

const handleNav = (tabId) => {
  emit('navigate', tabId);
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0 z-30">
    <!-- Brand Header -->
    <div class="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
        <Sparkles class="w-5 h-5" />
      </div>
      <div>
        <h1 class="font-bold text-gray-900 dark:text-white text-base leading-tight">AI Dev Journey</h1>
        <p class="text-xs text-gray-500 dark:text-gray-400">60 Days Roadmap</p>
      </div>
    </div>

    <!-- Streak & Quick Progress -->
    <div class="p-4 mx-3 my-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-xl border border-amber-500/20 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="p-2 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
          <Flame class="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Learning Streak</div>
          <div class="text-sm font-bold text-gray-900 dark:text-white">{{ state.streakCount }} {{ state.streakCount === 1 ? 'Day' : 'Days' }}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-xs text-gray-500 dark:text-gray-400">Hours</div>
        <div class="text-sm font-bold text-brand-600 dark:text-brand-400">{{ stats.totalLearningHours }}h</div>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-3 space-y-1 py-2 overflow-y-auto">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="handleNav(item.id)"
        :class="[
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
          currentTab === item.id
            ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold shadow-sm border border-brand-200/50 dark:border-brand-800/50'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <!-- Quick Action Button -->
    <div class="p-3">
      <button
        @click="emit('open-continue')"
        class="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white rounded-lg font-medium text-sm shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-95"
      >
        <Sparkles class="w-4 h-4" />
        <span>Continue Day {{ actions.getNextIncompleteDay() }}</span>
      </button>
    </div>

    <!-- Footer Settings & Theme -->
    <div v-if="user" class="px-3 pb-2">
      <div class="rounded-xl border border-gray-200 dark:border-gray-800 p-2.5 flex items-center gap-2.5">
        <img
          v-if="user.photoURL"
          :src="user.photoURL"
          :alt="user.displayName || 'Google profile'"
          referrerpolicy="no-referrer"
          class="w-9 h-9 rounded-full object-cover"
        />
        <div v-else class="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-bold">
          {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-semibold text-gray-900 dark:text-white truncate">{{ user.displayName || 'Google User' }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
        </div>
        <button
          @click="emit('logout')"
          class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          title="Sign out"
        >
          <LogOut class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="p-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
      <button
        @click="actions.toggleTheme"
        class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 text-xs font-medium"
        :title="state.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <Sun v-if="state.isDarkMode" class="w-4 h-4 text-amber-400" />
        <Moon v-else class="w-4 h-4 text-indigo-600" />
        <span>{{ state.isDarkMode ? 'Light' : 'Dark' }}</span>
      </button>

      <div class="flex items-center gap-1">
        <button
          @click="actions.exportData"
          class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Backup Data (Export JSON)"
        >
          <Download class="w-4 h-4" />
        </button>
        <button
          @click="emit('open-reset')"
          class="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          title="Reset Progress"
        >
          <RotateCcw class="w-4 h-4" />
        </button>
      </div>
    </div>
  </aside>

  <!-- Mobile Top Bar -->
  <header class="md:hidden sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white">
        <Sparkles class="w-4 h-4" />
      </div>
      <span class="font-bold text-sm text-gray-900 dark:text-white">AI Dev Journey</span>
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="actions.toggleTheme"
        class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Sun v-if="state.isDarkMode" class="w-4 h-4 text-amber-400" />
        <Moon v-else class="w-4 h-4 text-indigo-600" />
      </button>

      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>
  </header>

  <!-- Mobile Drawer Menu -->
  <div v-if="isMobileMenuOpen" class="md:hidden fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex justify-end">
    <div class="w-4/5 max-w-sm bg-white dark:bg-gray-900 h-full p-4 flex flex-col shadow-2xl">
      <div class="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
        <span class="font-bold text-gray-900 dark:text-white">Menu Navigation</span>
        <button @click="isMobileMenuOpen = false" class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <X class="w-5 h-5" />
        </button>
      </div>

      <nav class="flex-1 space-y-1 py-4">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="handleNav(item.id)"
          :class="[
            'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all',
            currentTab === item.id
              ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-gray-600 dark:text-gray-400'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <button
          @click="emit('open-continue'); isMobileMenuOpen = false;"
          class="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-accent-600 text-white rounded-lg font-medium text-sm shadow flex items-center justify-center gap-2"
        >
          <Sparkles class="w-4 h-4" />
          <span>Continue Day {{ actions.getNextIncompleteDay() }}</span>
        </button>

        <div v-if="user" class="rounded-xl border border-gray-200 dark:border-gray-800 p-3 flex items-center gap-3">
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="user.displayName || 'Google profile'"
            referrerpolicy="no-referrer"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold truncate">{{ user.displayName || 'Google User' }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
          </div>
          <button
            @click="emit('logout'); isMobileMenuOpen = false;"
            class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            title="Sign out"
          >
            <LogOut class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
