<script setup>
import { ref, onMounted } from 'vue';
import { state, actions, stats } from './store';

import Navbar from './components/Navbar.vue';
import DashboardOverview from './components/DashboardOverview.vue';
import RoadmapView from './components/RoadmapView.vue';
import TutorialsView from './components/TutorialsView.vue';
import ChatView from './components/ChatView.vue';
import DayDetailModal from './components/DayDetailModal.vue';
import TutorialDetailModal from './components/TutorialDetailModal.vue';
import NotesView from './components/NotesView.vue';
import ProjectsView from './components/ProjectsView.vue';
import ResourcesView from './components/ResourcesView.vue';
import CalendarView from './components/CalendarView.vue';
import ResetConfirmModal from './components/ResetConfirmModal.vue';

const currentTab = ref('dashboard');
const activeDayModal = ref(null);
const activeTutorialModal = ref(null);
const showResetModal = ref(false);

onMounted(() => {
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const openDayModal = (dayNum) => {
  activeDayModal.value = dayNum;
};

const openTutorialModal = (dayNum) => {
  activeTutorialModal.value = dayNum;
};

const handleResetConfirm = () => {
  actions.resetAllProgress();
  showResetModal.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row">
    <!-- Sidebar Navigation -->
    <Navbar
      :currentTab="currentTab"
      @navigate="(tab) => currentTab = tab"
      @open-continue="openDayModal(actions.getNextIncompleteDay())"
      @open-reset="showResetModal = true"
    />

    <!-- Main Content Area -->
    <main class="flex-1 p-4 md:p-8 overflow-x-hidden">
      <component
        :is="
          currentTab === 'dashboard' ? DashboardOverview :
          currentTab === 'roadmap' ? RoadmapView :
          currentTab === 'tutorials' ? TutorialsView :
          currentTab === 'chat' ? ChatView :
          currentTab === 'notes' ? NotesView :
          currentTab === 'projects' ? ProjectsView :
          currentTab === 'resources' ? ResourcesView :
          currentTab === 'calendar' ? CalendarView : DashboardOverview
        "
        @navigate="(tab) => currentTab = tab"
        @open-day="openDayModal"
        @open-tutorial="openTutorialModal"
        @open-projects="currentTab = 'projects'"
      />
    </main>

    <!-- Day Detail Modal -->
    <DayDetailModal
      v-if="activeDayModal !== null"
      :dayNum="activeDayModal"
      @close="activeDayModal = null"
    />

    <!-- Tutorial Detail Modal -->
    <TutorialDetailModal
      v-if="activeTutorialModal !== null"
      :dayNum="activeTutorialModal"
      @close="activeTutorialModal = null"
    />

    <!-- Reset Confirmation Modal -->
    <ResetConfirmModal
      v-if="showResetModal"
      @close="showResetModal = false"
      @confirm="handleResetConfirm"
    />
  </div>
</template>
