<script setup>
import { useRoute, useRouter } from 'vue-router';
import { Sparkles, Loader2, Sun, Moon } from 'lucide-vue-next';
import { authState, firebaseConfigError, loginWithGoogle } from '../auth';
import { state, actions } from '../store';

const route = useRoute();
const router = useRouter();

const handleLogin = async () => {
  const result = await loginWithGoogle();
  if (result?.authorized) {
    await router.replace(typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard');
  } else if (authState.user === null && authState.error === '') {
    await router.replace('/access-denied');
  }
};
</script>

<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 grid lg:grid-cols-[1.05fr_0.95fr]">
    <section class="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-brand-950 via-brand-900 to-accent-900 text-white">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
          <Sparkles class="w-6 h-6" />
        </div>
        <span class="font-bold text-lg">My AI Developer Journey</span>
      </div>
      <div class="max-w-xl">
        <p class="text-brand-200 font-semibold mb-4">60 DAYS. ONE CLEAR PATH.</p>
        <h1 class="text-5xl font-bold leading-tight">Build your AI agent developer skills with structure.</h1>
        <p class="mt-5 text-lg text-white/75 leading-relaxed">Your Personal AI Developer Learning & Interview Preparation Platform.</p>
      </div>
      <p class="text-sm text-white/60">Learning progress, notes, projects, and preferences stay in your browser.</p>
    </section>

    <section class="relative flex items-center justify-center px-6 py-12">
      <button
        @click="actions.toggleTheme"
        class="absolute right-6 top-6 p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
        :aria-label="state.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <Sun v-if="state.isDarkMode" class="w-5 h-5 text-amber-400" />
        <Moon v-else class="w-5 h-5 text-indigo-600" />
      </button>

      <div class="w-full max-w-md">
        <div class="lg:hidden flex items-center gap-3 mb-10">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white">
            <Sparkles class="w-5 h-5" />
          </div>
          <div>
            <p class="font-bold">My AI Developer Journey</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">60 Days AI Agent Developer Roadmap</p>
          </div>
        </div>

        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 sm:p-9 shadow-xl shadow-gray-200/50 dark:shadow-black/20">
          <h2 class="text-3xl font-bold">Welcome Back</h2>
          <p class="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Continue your learning journey with your authorized Google account.
          </p>

          <div v-if="firebaseConfigError.length" class="mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            Google sign-in is being set up. Add the Firebase Web App configuration to continue.
          </div>

          <button
            @click="handleLogin"
            :disabled="authState.loading || firebaseConfigError.length > 0"
            class="mt-7 w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-sm font-semibold flex items-center justify-center gap-3 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Loader2 v-if="authState.loading" class="w-5 h-5 animate-spin" />
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M21.6 12.227c0-.709-.064-1.391-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.741 2.982-4.309 2.982-7.351z"/>
              <path fill="#34A853" d="M12 22c2.7 0 4.964-.895 6.618-2.422l-3.232-2.51c-.895.6-2.04.955-3.386.955-2.605 0-4.811-1.759-5.6-4.123H3.064v2.591A10 10 0 0 0 12 22z"/>
              <path fill="#FBBC05" d="M6.4 13.9A6.02 6.02 0 0 1 6.09 12c0-.66.114-1.3.309-1.9V7.509H3.064A10 10 0 0 0 2 12c0 1.614.386 3.141 1.064 4.491z"/>
              <path fill="#EA4335" d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.96 2.992 14.7 2 12 2a10 10 0 0 0-8.936 5.509L6.4 10.1C7.189 7.736 9.395 5.977 12 5.977z"/>
            </svg>
            <span>{{ authState.loading ? 'Signing in...' : 'Continue with Google' }}</span>
          </button>

          <p v-if="authState.error" role="alert" class="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {{ authState.error }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
