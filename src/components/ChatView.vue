<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import { state, actions } from '../store';
import {
  Send,
  MessageSquare,
  Plus,
  Trash2,
  Bot,
  User,
  Loader2,
  Copy,
  Check
} from 'lucide-vue-next';

const chatInput = ref('');
const isLoading = ref(false);
const chatContainer = ref(null);

const activeChat = computed(() => state.chats.find(c => c.id === state.activeChatId));

const sendMessage = async () => {
  if (!chatInput.value.trim() || !activeChat.value) return;

  const userMessage = { role: 'user', content: chatInput.value };
  actions.sendMessage(state.activeChatId, userMessage);
  chatInput.value = '';
  isLoading.value = true;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: activeChat.value.messages,
        systemPrompt: "You are a helpful AI programming tutor for an IT developer. Prefer Telugu-English explanations. Provide practical examples, line-by-line code explanations, and structured answers."
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'The AI request failed.');
    }
    if (!data.content?.[0]?.text) {
      throw new Error('The AI provider returned an empty response.');
    }
    const aiMessage = { role: 'assistant', content: data.content[0].text };
    actions.sendMessage(state.activeChatId, aiMessage);
  } catch (error) {
    actions.sendMessage(state.activeChatId, { role: 'assistant', content: "Sorry, I encountered an error. Please check if the backend server is running." });
  } finally {
    isLoading.value = false;
    nextTick(() => { scrollToBottom(); });
  }
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onMounted(() => {
    if (!state.activeChatId && state.chats.length > 0) {
        state.activeChatId = state.chats[0].id;
    }
});
</script>

<template>
  <div class="flex h-[85vh] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
    <!-- Chat Sidebar -->
    <div class="w-64 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <button @click="actions.addChat()" class="p-4 flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-800">
        <Plus class="w-4 h-4" /> New Conversation
      </button>
      <div class="flex-1 overflow-y-auto">
        <button
          v-for="chat in state.chats"
          :key="chat.id"
          @click="state.activeChatId = chat.id"
          :class="['w-full p-3 text-left text-xs truncate', state.activeChatId === chat.id ? 'bg-gray-100 dark:bg-gray-800 font-bold' : '']"
        >
          {{ chat.title }}
        </button>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col">
      <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="(msg, idx) in (activeChat?.messages || [])" :key="idx" :class="['flex gap-3', msg.role === 'assistant' ? '' : 'justify-end']">
          <div v-if="msg.role === 'assistant'" class="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center flex-shrink-0">
            <Bot class="w-5 h-5 text-brand-600" />
          </div>
          <div :class="['p-3 rounded-2xl max-w-[80%] text-sm', msg.role === 'assistant' ? 'bg-gray-100 dark:bg-gray-800' : 'bg-brand-600 text-white']">
            {{ msg.content }}
          </div>
        </div>
        <div v-if="isLoading" class="flex items-center gap-2 text-xs text-gray-400 p-2">
          <Loader2 class="w-4 h-4 animate-spin" /> AI Tutor is thinking...
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
          <input
            v-model="chatInput"
            @keyup.enter="sendMessage"
            placeholder="Ask a technical question..."
            class="flex-1 bg-transparent p-2 text-sm focus:outline-none"
          />
          <button @click="sendMessage" class="p-2 bg-brand-600 text-white rounded-lg">
            <Send class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
