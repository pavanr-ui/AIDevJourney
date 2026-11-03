<script setup>
import { ref, computed, watch } from 'vue';
import { state, actions } from '../store';
import { getTutorialForDay } from '../data/tutorials';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code2,
  HelpCircle,
  FileText,
  Bookmark,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Award,
  Terminal,
  Lightbulb,
  ExternalLink
} from 'lucide-vue-next';

const props = defineProps({
  dayNum: Number
});
const emit = defineEmits(['close', 'select-day']);

const currentDay = ref(props.dayNum);
const tutorial = computed(() => getTutorialForDay(currentDay.value));
const progress = computed(() => state.tutorialProgress[currentDay.value] || { completed: false, quizScore: null, bookmarked: false, notes: "" });

const activeTab = ref('tutorial'); // tutorial, code, exercises, quiz, interview, notes, ai-prompts

// Interactive Code States
const copied = ref(false);
const showHint = ref({ beginner: false, intermediate: false, advanced: false });
const showSolution = ref({ beginner: false, intermediate: false, advanced: false });

const copyCode = (codeText) => {
  navigator.clipboard.writeText(codeText);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
};

// Quiz States
const selectedAnswers = ref({});
const quizSubmitted = ref(false);
const quizScore = computed(() => {
  let correct = 0;
  tutorial.value.mcqs.forEach((mcq, idx) => {
    if (selectedAnswers.value[idx] === mcq.correct) correct++;
  });
  return correct;
});

const submitQuiz = () => {
  quizSubmitted.value = true;
  actions.saveTutorialQuizScore(currentDay.value, quizScore.value);
};

// Notes state
const userNotes = ref(progress.value.notes || '');
watch(userNotes, (val) => {
  actions.saveTutorialNote(currentDay.value, val);
});

// Reset quiz when day changes
watch(currentDay, () => {
  selectedAnswers.value = {};
  quizSubmitted.value = false;
  userNotes.value = state.tutorialProgress[currentDay.value]?.notes || '';
});
const goToPrevious = () => { if (currentDay.value > 1) currentDay.value--; };
const goToNext = () => { if (currentDay.value < 60) currentDay.value++; };
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-gray-900/60 backdrop-blur-md">
    <div class="bg-white dark:bg-gray-900 w-full max-w-6xl h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800">
      <!-- Top Bar -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10 flex-shrink-0">
        <div class="flex items-center gap-3">
          <button @click="emit('close')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                Day {{ tutorial.day }} • {{ tutorial.phase }}
              </span>
              <span v-if="progress.completed" class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-1">
                <CheckCircle2 class="w-3 h-3" /> Completed
              </span>
            </div>
            <h2 class="text-base md:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{{ tutorial.title }}</h2>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Bookmark Button -->
          <button
            @click="actions.toggleTutorialBookmark(currentDay)"
            :class="[
              'p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors',
              progress.bookmarked ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
            ]"
            title="Bookmark Tutorial"
          >
            <Bookmark :class="['w-4 h-4', progress.bookmarked ? 'fill-amber-500 text-amber-500' : '']" />
            <span class="hidden sm:inline">{{ progress.bookmarked ? 'Bookmarked' : 'Bookmark' }}</span>
          </button>

          <!-- Complete Toggle -->
          <button
            @click="actions.toggleTutorialComplete(currentDay)"
            :class="[
              'px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors',
              progress.completed ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-600'
            ]"
          >
            <CheckCircle2 class="w-4 h-4" />
            <span>{{ progress.completed ? 'Completed' : 'Mark Complete' }}</span>
          </button>

          <button @click="emit('close')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Tabs Navigation Bar -->
      <div class="flex items-center gap-1 px-4 py-2 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 overflow-x-auto flex-shrink-0">
        <button
          v-for="tab in [
            { id: 'tutorial', label: '📖 Tutorial & Guide' },
            { id: 'code', label: '💻 Code & Output' },
            { id: 'exercises', label: '⚡ Practical Exercises' },
            { id: 'quiz', label: '🎯 MCQ Quiz' },
            { id: 'interview', label: '💡 Interview Q&A' },
            { id: 'ai-prompts', label: '🤖 AI Prompts' },
            { id: 'notes', label: '📝 My Notes' }
          ]"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all',
            activeTab === tab.id
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Modal Body Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- TAB 1: Tutorial & Guide (1, 2, 3, 8, 14, 15) -->
        <div v-if="activeTab === 'tutorial'" class="space-y-6 max-w-4xl mx-auto">
          <!-- Introduction -->
          <div class="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950/40 dark:to-accent-950/40 p-5 rounded-2xl border border-brand-200/50 dark:border-brand-800/50 space-y-2">
            <h3 class="text-sm font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider">1. Introduction & Importance</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{{ tutorial.introduction }}</p>
          </div>

          <!-- Telugu-English Explanation -->
          <div class="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-200 dark:border-amber-800/50 space-y-2">
            <h3 class="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">2. Simple Telugu-English Explanation</h3>
            <p class="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{{ tutorial.bilingualExplanation }}</p>
          </div>

          <!-- Key Concepts -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">3. Important Concepts & Terminology</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="(concept, cIdx) in tutorial.concepts" :key="cIdx" class="p-3.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">{{ cIdx + 1 }}</span>
                <span>{{ concept }}</span>
              </div>
            </div>
          </div>

          <!-- Real-world use cases -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">8. Real-World AI Agent Use Cases</h3>
            <ul class="space-y-2">
              <li v-for="(uc, ucIdx) in tutorial.useCases" :key="ucIdx" class="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <Sparkles class="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span>{{ uc }}</span>
              </li>
            </ul>
          </div>

          <!-- Common Errors -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">9. Common Errors & Solutions</h3>
            <div class="space-y-3">
              <div v-for="(err, errIdx) in tutorial.commonErrors" :key="errIdx" class="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl space-y-1">
                <div class="text-xs font-bold text-red-700 dark:text-red-400">❌ Error: {{ err.error }}</div>
                <div class="text-xs font-medium text-emerald-700 dark:text-emerald-400">✔️ Solution: {{ err.solution }}</div>
              </div>
            </div>
          </div>

          <!-- Summary & Documentation -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div class="space-y-2">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">14. Lesson Summary</h3>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{{ tutorial.summary }}</p>
            </div>
            <div class="space-y-2">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">15. Free Official Documentation</h3>
              <div class="space-y-1.5">
                <a v-for="res in tutorial.resources" :key="res.url" :href="res.url" target="_blank" class="block p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-brand-50 text-xs text-brand-600 dark:text-brand-400 flex items-center justify-between">
                  <span>{{ res.label }}</span>
                  <ExternalLink class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: Code & Output (4, 5, 6, 7) -->
        <div v-else-if="activeTab === 'code'" class="space-y-6 max-w-4xl mx-auto">
          <!-- Syntax Example -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">4. Syntax & Practical Pattern</h3>
            </div>
            <div class="relative bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
              <button @click="copyCode(tutorial.syntaxExample)" class="absolute right-3 top-3 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-[11px] text-gray-300 flex items-center gap-1">
                <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-400" />
                <Copy v-else class="w-3.5 h-3.5" />
                <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{{ tutorial.syntaxExample }}</code></pre>
            </div>
          </div>

          <!-- Complete Working Code -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">5. Complete Working Code Example</h3>
            </div>
            <div class="relative bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
              <button @click="copyCode(tutorial.workingCode)" class="absolute right-3 top-3 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-[11px] text-gray-300 flex items-center gap-1">
                <Copy class="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </button>
              <pre><code>{{ tutorial.workingCode }}</code></pre>
            </div>
          </div>

          <!-- Line-by-Line Explanation -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">6. Line-by-Line Code Explanation</h3>
            <div class="space-y-2">
              <div v-for="(exp, expIdx) in tutorial.codeExplanation" :key="expIdx" class="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2 font-mono">
                <span class="text-brand-500 font-bold">#{{ expIdx + 1 }}</span>
                <span>{{ exp }}</span>
              </div>
            </div>
          </div>

          <!-- Expected Output -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">7. Expected Output</h3>
            <div class="bg-gray-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto">
              <pre><code>{{ tutorial.expectedOutput }}</code></pre>
            </div>
          </div>
        </div>

        <!-- TAB 3: Practical Exercises (10, 11) -->
        <div v-else-if="activeTab === 'exercises'" class="space-y-6 max-w-4xl mx-auto">
          <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">10. Practical Coding Exercises (Beginner, Intermediate, Advanced)</h3>

          <div v-for="level in ['beginner', 'intermediate', 'advanced']" :key="level" class="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-4 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase" :class="level === 'beginner' ? 'bg-emerald-100 text-emerald-800' : level === 'intermediate' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'">
                {{ level }} Exercise
              </span>
            </div>
            <p class="text-sm text-gray-800 dark:text-gray-200 font-medium">{{ tutorial.exercises[level] }}</p>

            <div class="flex items-center gap-3">
              <button @click="showHint[level] = !showHint[level]" class="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Lightbulb class="w-3.5 h-3.5" /> {{ showHint[level] ? 'Hide Hint' : 'Show Hint' }}
              </button>
              <button @click="showSolution[level] = !showSolution[level]" class="px-3 py-1.5 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Code2 class="w-3.5 h-3.5" /> {{ showSolution[level] ? 'Hide Solution' : 'Show Solution' }}
              </button>
            </div>

            <div v-if="showHint[level]" class="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 rounded-xl text-xs text-amber-800 dark:text-amber-300">
              💡 <strong>Hint:</strong> {{ tutorial.hints[level] }}
            </div>

            <div v-if="showSolution[level]" class="p-3 bg-gray-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
              <pre><code>{{ tutorial.solutions[level] }}</code></pre>
            </div>
          </div>
        </div>

        <!-- TAB 4: MCQ Quiz (13) -->
        <div v-else-if="activeTab === 'quiz'" class="space-y-6 max-w-4xl mx-auto">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">13. Knowledge Check (5 MCQs)</h3>
            <span v-if="quizSubmitted" class="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800">
              Score: {{ quizScore }} / 5 ({{ Math.round((quizScore/5)*100) }}%)
            </span>
          </div>

          <div v-for="(mcq, mIdx) in tutorial.mcqs" :key="mIdx" class="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-3 shadow-sm">
            <h4 class="text-sm font-bold text-gray-900 dark:text-white">Q{{ mIdx + 1 }}: {{ mcq.question }}</h4>
            <div class="space-y-2">
              <label
                v-for="(opt, oIdx) in mcq.options"
                :key="oIdx"
                class="flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors"
                :class="[
                  quizSubmitted && oIdx === mcq.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' :
                  quizSubmitted && selectedAnswers[mIdx] === oIdx && oIdx !== mcq.correct ? 'bg-red-50 border-red-500 text-red-900 dark:bg-red-950/40 dark:text-red-300' :
                  selectedAnswers[mIdx] === oIdx ? 'bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-950/40 dark:text-brand-300' :
                  'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                ]"
              >
                <input type="radio" :name="`mcq_${mIdx}`" :value="oIdx" v-model="selectedAnswers[mIdx]" :disabled="quizSubmitted" class="text-brand-600 focus:ring-brand-500" />
                <span>{{ opt }}</span>
              </label>
            </div>
            <div v-if="quizSubmitted" class="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
              <strong>Explanation:</strong> {{ mcq.explanation }}
            </div>
          </div>

          <div v-if="!quizSubmitted" class="text-center pt-4">
            <button @click="submitQuiz" class="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/20">
              Submit Quiz Answers
            </button>
          </div>
        </div>

        <!-- TAB 5: Interview Q&A (12) -->
        <div v-else-if="activeTab === 'interview'" class="space-y-6 max-w-4xl mx-auto">
          <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">12. Top 5 Technical Interview Questions</h3>
          <div v-for="(iq, iqIdx) in tutorial.interviewQuestions" :key="iqIdx" class="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-2 shadow-sm">
            <h4 class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">Q{{ iqIdx + 1 }}</span>
              <span>{{ iq.q }}</span>
            </h4>
            <div class="pl-8 text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
              <strong>Answer:</strong> {{ iq.a }}
            </div>
          </div>
        </div>

        <!-- TAB 6: AI-Assisted Coding Guide (Section 5) -->
        <div v-else-if="activeTab === 'ai-prompts'" class="space-y-6 max-w-4xl mx-auto">
          <div class="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 rounded-2xl border border-purple-200 dark:border-purple-800/50 space-y-3">
            <h3 class="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles class="w-5 h-5" /> AI-Assisted Coding Guide (Claude Code & ChatGPT)
            </h3>
            <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              Use these battle-tested prompts with Claude Code or ChatGPT to generate, understand, debug, refactor, and review code for Day {{ currentDay }}: {{ tutorial.title }}.
            </p>
          </div>

          <div class="space-y-4">
            <div v-for="(promptItem, pIdx) in [
              { title: '1. Code Generation Prompt', prompt: `Write a robust Python script for Day ${currentDay} (${tutorial.title}) following PEP8 standards with type hints and exception handling.` },
              { title: '2. Line-by-Line Explanation Prompt', prompt: `Explain this code line by line in simple Telugu-English and English, highlighting potential edge cases.` },
              { title: '3. Debugging & Error Fixing Prompt', prompt: `I am encountering an error in my script for ${tutorial.title}. Here is the stack trace: [Paste Error]. Analyze the root cause and provide a fix.` },
              { title: '4. Code Refactoring Prompt', prompt: `Review my code for ${tutorial.title} and refactor it for better performance, readability, and modularity.` },
              { title: '5. Unit Test Generation Prompt', prompt: `Write pytest unit tests for all functions in my script for Day ${currentDay}, covering golden path and edge cases.` }
            ]" :key="pIdx" class="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-bold text-gray-900 dark:text-white">{{ promptItem.title }}</h4>
                <button @click="copyCode(promptItem.prompt)" class="px-2.5 py-1 bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded text-[11px] font-semibold flex items-center gap-1">
                  <Copy class="w-3.5 h-3.5" /> Copy Prompt
                </button>
              </div>
              <div class="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg font-mono text-xs text-gray-700 dark:text-gray-300">
                {{ promptItem.prompt }}
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 7: My Notes (Section 8) -->
        <div v-else-if="activeTab === 'notes'" class="space-y-6 max-w-4xl mx-auto">
          <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">8. Personal Notes & Code Snippets for Day {{ currentDay }}</h3>
          <textarea
            v-model="userNotes"
            placeholder="Write your personal notes, code snippets, questions, and doubts here. Saved automatically!"
            class="w-full h-64 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
          ></textarea>
        </div>
      </div>

      <!-- Modal Footer - Prev / Next Lesson -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800 flex-shrink-0">
        <button
          @click="goToPrevious"
          :disabled="currentDay <= 1"
          class="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold disabled:opacity-50 flex items-center gap-1"
        >
          <ChevronLeft class="w-4 h-4" /> Previous Lesson
        </button>

        <span class="text-xs font-medium text-gray-500">Day {{ currentDay }} of 60</span>

        <button
          @click="goToNext"
          :disabled="currentDay >= 60"
          class="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold disabled:opacity-50 flex items-center gap-1"
        >
          Next Lesson <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
