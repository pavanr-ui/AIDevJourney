<script setup>
import { AlertTriangle, RotateCcw, X } from 'lucide-vue-next';

const emit = defineEmits(['close', 'confirm']);
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 p-6 space-y-6 text-center">
      <div class="w-14 h-14 mx-auto rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
        <AlertTriangle class="w-7 h-7" />
      </div>

      <div class="space-y-2">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Reset All Progress?</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This action will reset all your checklist progress, study hours, and personal notes back to zero. This cannot be undone unless you exported a JSON backup.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="emit('close')"
          class="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          @click="emit('confirm')"
          class="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-red-500/20 transition-colors"
        >
          Yes, Reset All
        </button>
      </div>
    </div>
  </div>
</template>
