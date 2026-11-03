<script setup>
import { state, actions } from '../store';
import {
  FolderKanban,
  CheckSquare,
  Square,
  Github,
  ExternalLink,
  Code2,
  FileText,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-vue-next';
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <FolderKanban class="w-6 h-6 text-brand-500" />
        <span>AI Agent Portfolio Projects</span>
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Track your progress on the 3 major hands-on AI Agent projects included in the 60-day roadmap.</p>
    </div>

    <!-- Projects Grid -->
    <div class="space-y-6">
      <div
        v-for="(project, pIdx) in state.projects"
        :key="project.id"
        class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6"
      >
        <!-- Project Title & Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                Project {{ project.id }} • Phase {{ project.phase }}
              </span>
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1',
                  project.status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' :
                  project.status === 'In Progress' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' :
                  'bg-gray-100 dark:bg-gray-800 text-gray-500'
                ]"
              >
                <CheckCircle2 v-if="project.status === 'Completed'" class="w-3.5 h-3.5" />
                <Clock v-else-if="project.status === 'In Progress'" class="w-3.5 h-3.5" />
                <span>{{ project.status }}</span>
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ project.name }}</h3>
          </div>

          <div class="flex items-center gap-3">
            <select
              v-model="project.status"
              class="bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:ring-0"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <!-- Description & Tech Stack -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 space-y-4">
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Tech Stack Tags -->
            <div>
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Code2 class="w-3.5 h-3.5" /> Technology Stack
              </h4>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Features Checklist -->
            <div>
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Features Checklist</h4>
              <div class="space-y-1.5">
                <button
                  v-for="(feature, fIdx) in project.features"
                  :key="fIdx"
                  @click="actions.toggleProjectFeature(pIdx, fIdx)"
                  class="w-full flex items-center gap-2.5 p-2 rounded-lg bg-gray-50 dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-xs"
                >
                  <CheckSquare v-if="feature.completed" class="w-4 h-4 text-brand-500" />
                  <Square v-else class="w-4 h-4 text-gray-400" />
                  <span :class="{'line-through text-gray-400': feature.completed}">{{ feature.text }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- URLs & Project Notes -->
          <div class="space-y-4 bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Links</h4>

              <div>
                <label class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <Github class="w-3 h-3" /> GitHub Repository URL
                </label>
                <input
                  v-model="project.repoUrl"
                  type="text"
                  placeholder="https://github.com/your-username/project-repo"
                  class="w-full px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <ExternalLink class="w-3 h-3" /> Live Demo URL
                </label>
                <input
                  v-model="project.demoUrl"
                  type="text"
                  placeholder="https://your-demo-app.vercel.app"
                  class="w-full px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div class="pt-2">
              <label class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                <FileText class="w-3 h-3" /> Project Notes & Architecture Notes
              </label>
              <textarea
                v-model="project.notes"
                placeholder="Write notes on deployment, API keys, or architecture design..."
                class="w-full h-24 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
