<script setup>
import { useRouter } from 'vue-router';
import { ShieldAlert, LogOut } from 'lucide-vue-next';
import { authState, logout } from '../auth';

const router = useRouter();

const handleLogout = async () => {
  await logout();
  await router.replace('/login');
};
</script>

<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6">
    <div class="w-full max-w-md rounded-2xl border border-red-200 dark:border-red-900 bg-white dark:bg-gray-900 p-8 text-center shadow-xl">
      <div class="mx-auto w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
        <ShieldAlert class="w-7 h-7" />
      </div>
      <h1 class="mt-5 text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
      <p class="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        This account is not authorized to open My AI Developer Journey.
      </p>
      <button
        @click="handleLogout"
        :disabled="authState.loading"
        class="mt-6 w-full h-11 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <LogOut class="w-4 h-4" />
        {{ authState.loading ? 'Signing out...' : 'Sign out' }}
      </button>
    </div>
  </main>
</template>
