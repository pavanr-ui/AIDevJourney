<script setup>
import {
  BookmarkCheck,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-vue-next';

const categories = [
  {
    title: "Official Documentation & Guides",
    resources: [
      {
        name: "Python Official Documentation",
        description: "Official Python 3 reference manuals, tutorials, and standard library documentation.",
        url: "https://docs.python.org/3/",
        tag: "Core Language",
        isFree: true
      },
      {
        name: "FastAPI Documentation",
        description: "Comprehensive guide to building high-performance, async Python web APIs.",
        url: "https://fastapi.tiangolo.com/",
        tag: "Backend Framework",
        isFree: true
      },
      {
        name: "LangGraph Documentation",
        description: "Official docs for building resilient, multi-agent workflows with state graphs.",
        url: "https://langchain-ai.github.io/langgraph/",
        tag: "Agent Framework",
        isFree: true
      },
      {
        name: "Claude Code Documentation",
        description: "Guide for installing, configuring, and using Anthropic's CLI AI developer tool.",
        url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code",
        tag: "AI Coding Tool",
        isFree: true
      }
    ]
  },
  {
    title: "AI & Automation Learning Platforms",
    resources: [
      {
        name: "n8n Academy",
        description: "Free self-paced courses for mastering visual workflow automation and AI nodes.",
        url: "https://academy.n8n.io/",
        tag: "Automation",
        isFree: true
      },
      {
        name: "Prompt Engineering Guide",
        description: "Open-source guide on prompting techniques, ReAct, CoT, and RAG architectures.",
        url: "https://www.promptingguide.ai/",
        tag: "Prompting",
        isFree: true
      },
      {
        name: "OpenAI API Platform Docs",
        description: "Detailed guides on Function Calling, Structured Outputs, Embeddings, and Fine-Tuning.",
        url: "https://platform.openai.com/docs/",
        tag: "LLM Provider",
        isFree: true
      },
      {
        name: "GitHub Docs & Git Guide",
        description: "Learn version control, pull requests, GitHub Actions, and repository management.",
        url: "https://docs.github.com/en",
        tag: "DevOps / Git",
        isFree: true
      }
    ]
  }
];
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <BookmarkCheck class="w-6 h-6 text-brand-500" />
        <span>Official Free Learning Resources</span>
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Hand-picked, official documentation and free learning portals to support your 60-day journey.</p>
    </div>

    <!-- Banner -->
    <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3">
      <div class="p-2 bg-emerald-500 text-white rounded-xl">
        <ShieldCheck class="w-5 h-5" />
      </div>
      <div class="text-xs text-emerald-800 dark:text-emerald-300">
        <span class="font-bold">100% Verified Free Resources:</span> Every link listed below is an official free documentation site or open education resource. No hidden paywalls.
      </div>
    </div>

    <!-- Categories -->
    <div v-for="cat in categories" :key="cat.title" class="space-y-4">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
        {{ cat.title }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="res in cat.resources"
          :key="res.name"
          class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-brand-500 transition-colors group"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                {{ res.tag }}
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 uppercase">
                Free Resource
              </span>
            </div>

            <h4 class="font-bold text-gray-900 dark:text-white text-base group-hover:text-brand-600 transition-colors mb-2">
              {{ res.name }}
            </h4>

            <p class="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              {{ res.description }}
            </p>
          </div>

          <div class="pt-3 border-t border-gray-100 dark:border-gray-800">
            <a
              :href="res.url"
              target="_blank"
              class="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>Visit Documentation</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
