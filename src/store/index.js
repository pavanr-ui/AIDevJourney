import { reactive, computed, watch } from 'vue';
import { roadmapData } from '../data/roadmap';

const STORAGE_KEY = 'ai_dev_journey_data_v1';

// Default projects
const defaultProjects = [
  {
    id: 1,
    name: "AI Document Assistant",
    description: "RAG-based application to upload PDF documents, search content, ask questions, generate answers with source references.",
    phase: 4,
    techStack: ["Python", "FastAPI", "OpenAI/Claude API", "RAG", "Embeddings", "Vue.js"],
    status: "Not Started", // Not Started, In Progress, Completed
    repoUrl: "",
    demoUrl: "",
    notes: "",
    features: [
      { text: "Upload PDF documents", completed: false },
      { text: "Semantic search in document content", completed: false },
      { text: "Ask questions & get AI answers", completed: false },
      { text: "Display source references & page numbers", completed: false },
      { text: "FastAPI REST backend", completed: false }
    ]
  },
  {
    id: 2,
    name: "AI Customer Support Agent",
    description: "Advanced multi-agent support agent that understands queries, searches knowledge bases, maintains context, and escalates to human support when needed.",
    phase: 5,
    techStack: ["LangGraph", "Python", "FastAPI", "Multi-Agent", "Human-in-the-loop", "State Management"],
    status: "Not Started",
    repoUrl: "",
    demoUrl: "",
    notes: "",
    features: [
      { text: "Understand customer queries", completed: false },
      { text: "Search knowledge base automatically", completed: false },
      { text: "Generate accurate context-aware answers", completed: false },
      { text: "Maintain conversation history across sessions", completed: false },
      { text: "Escalate complex queries to human support (Human-in-the-loop)", completed: false }
    ]
  },
  {
    id: 3,
    name: "AI Developer Assistant",
    description: "Full-stack portfolio project: Vue.js frontend + Python FastAPI backend + AI Agent integration for code/doc analysis, tool calling, memory, and human approval.",
    phase: 6,
    techStack: ["Vue.js", "Python", "FastAPI", "LangGraph", "Tool Calling", "Memory", "Docker"],
    status: "Not Started",
    repoUrl: "",
    demoUrl: "",
    notes: "",
    features: [
      { text: "Vue.js interactive dashboard", completed: false },
      { text: "Python FastAPI backend service", completed: false },
      { text: "AI Agent with tool calling & conversation memory", completed: false },
      { text: "Code & document analysis capabilities", completed: false },
      { text: "Human approval workflow & error handling", completed: false },
      { text: "Documented & deployed on GitHub / Cloud", completed: false }
    ]
  }
];

// Initialize default state
const getInitialState = () => {
  const dayStatuses = {};
  const dayTasks = {};
  const dayNotes = {};
  const studyHours = {};
  const tutorialProgress = {};

  roadmapData.forEach(phase => {
    phase.days.forEach(day => {
      dayStatuses[day.day] = 'Not Started'; // 'Not Started', 'In Progress', 'Completed'
      dayTasks[day.day] = {};
      day.tasks.forEach(task => {
        dayTasks[day.day][task.id] = false;
      });
      dayNotes[day.day] = "";
      studyHours[day.day] = 0;
      tutorialProgress[day.day] = {
        completed: false,
        quizScore: null,
        bookmarked: false,
        notes: ""
      };
    });
  });

  return {
    isDarkMode: false,
    dayStatuses,
    dayTasks,
    dayNotes,
    studyHours,
    tutorialProgress,
    projects: JSON.parse(JSON.stringify(defaultProjects)),
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakCount: 0,
    chats: [], // Array of { id, title, messages: [] }
    activeChatId: null
  };
};

// Load state from localStorage or use initial
const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with default state structure in case roadmap changed
      const initial = getInitialState();
      return {
        ...initial,
        ...parsed,
        dayStatuses: { ...initial.dayStatuses, ...parsed.dayStatuses },
        dayTasks: { ...initial.dayTasks, ...parsed.dayTasks },
        dayNotes: { ...initial.dayNotes, ...parsed.dayNotes },
        studyHours: { ...initial.studyHours, ...parsed.studyHours },
        tutorialProgress: { ...initial.tutorialProgress, ...parsed.tutorialProgress },
        projects: parsed.projects || initial.projects
      };
    }
  } catch (e) {
    console.error("Failed to load from localStorage:", e);
  }
  return getInitialState();
};

export const state = reactive(loadState());

// Auto-save to localStorage whenever state changes
watch(
  () => state,
  (newState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  },
  { deep: true }
);

// Computed Statistics
export const stats = computed(() => {
  const totalDays = 60;
  let completedDays = 0;
  let inProgressDays = 0;
  let pendingDays = 0;
  let totalTasks = 0;
  let completedTasks = 0;
  let totalHours = 0;

  roadmapData.forEach(phase => {
    phase.days.forEach(day => {
      const status = state.dayStatuses[day.day];
      if (status === 'Completed') completedDays++;
      else if (status === 'In Progress') inProgressDays++;
      else pendingDays++;

      day.tasks.forEach(task => {
        totalTasks++;
        if (state.dayTasks[day.day]?.[task.id]) {
          completedTasks++;
        }
      });

      totalHours += Number(state.studyHours[day.day] || 0);
    });
  });

  const overallCompletionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const completedProjects = state.projects.filter(p => p.status === 'Completed').length;

  return {
    totalDays,
    completedDays,
    inProgressDays,
    pendingDays,
    overallCompletionPercentage,
    completedTopics: completedDays,
    totalTopics: totalDays,
    totalTasks,
    completedTasks,
    totalLearningHours: totalHours,
    completedProjects,
    totalProjects: state.projects.length
  };
});

// Helper functions / actions
export const actions = {
  toggleTutorialComplete(dayNum) {
    if (!state.tutorialProgress[dayNum]) {
      state.tutorialProgress[dayNum] = { completed: false, quizScore: null, bookmarked: false, notes: "" };
    }
    state.tutorialProgress[dayNum].completed = !state.tutorialProgress[dayNum].completed;

    // Synchronize with day status - if tutorial is completed, mark day as completed
    if (state.tutorialProgress[dayNum].completed) {
      state.dayStatuses[dayNum] = 'Completed';
      // Also mark all tasks as completed for that day
      const dayData = roadmapData.flatMap(p => p.days).find(d => d.day === dayNum);
      if (dayData) {
        dayData.tasks.forEach(t => {
          if (!state.dayTasks[dayNum]) state.dayTasks[dayNum] = {};
          state.dayTasks[dayNum][t.id] = true;
        });
      }
    }
  },

  toggleTutorialBookmark(dayNum) {
    if (!state.tutorialProgress[dayNum]) {
      state.tutorialProgress[dayNum] = { completed: false, quizScore: null, bookmarked: false, notes: "" };
    }
    state.tutorialProgress[dayNum].bookmarked = !state.tutorialProgress[dayNum].bookmarked;
  },

  saveTutorialQuizScore(dayNum, score) {
    if (!state.tutorialProgress[dayNum]) {
      state.tutorialProgress[dayNum] = { completed: false, quizScore: null, bookmarked: false, notes: "" };
    }
    state.tutorialProgress[dayNum].quizScore = score;
  },

  saveTutorialNote(dayNum, text) {
    if (!state.tutorialProgress[dayNum]) {
      state.tutorialProgress[dayNum] = { completed: false, quizScore: null, bookmarked: false, notes: "" };
    }
    state.tutorialProgress[dayNum].notes = text;
  },

  addChat() {
    const id = Date.now().toString();
    state.chats.unshift({ id, title: 'New Conversation', messages: [] });
    state.activeChatId = id;
    return id;
  },

  sendMessage(chatId, message) {
    const chat = state.chats.find(c => c.id === chatId);
    if (chat) {
      chat.messages.push(message);
      if (chat.title === 'New Conversation' && chat.messages.length === 1) {
        chat.title = message.content.substring(0, 30) + '...';
      }
    }
  },

  toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setDayStatus(dayNum, status) {
    state.dayStatuses[dayNum] = status;
    this.checkAutoDayStatus(dayNum);
  },

  toggleTask(dayNum, taskId) {
    if (!state.dayTasks[dayNum]) {
      state.dayTasks[dayNum] = {};
    }
    state.dayTasks[dayNum][taskId] = !state.dayTasks[dayNum][taskId];

    this.checkAutoDayStatus(dayNum);
    this.updateStreak();
  },

  checkAutoDayStatus(dayNum) {
    // Auto-update day status based on task completion
    const dayData = roadmapData.flatMap(p => p.days).find(d => d.day === dayNum);
    if (!dayData) return;

    const tasks = dayData.tasks;
    const completedCount = tasks.filter(t => state.dayTasks[dayNum]?.[t.id]).length;

    if (completedCount === tasks.length && tasks.length > 0) {
      state.dayStatuses[dayNum] = 'Completed';
    } else if (completedCount > 0) {
      state.dayStatuses[dayNum] = 'In Progress';
    } else if (state.dayStatuses[dayNum] === 'Completed' && completedCount < tasks.length) {
      state.dayStatuses[dayNum] = 'In Progress';
    }
  },

  saveNote(dayNum, content) {
    state.dayNotes[dayNum] = content;
  },

  logHours(dayNum, hours) {
    state.studyHours[dayNum] = Math.max(0, Number(hours) || 0);
  },

  updateProject(projectIndex, updatedData) {
    state.projects[projectIndex] = {
      ...state.projects[projectIndex],
      ...updatedData
    };
  },

  toggleProjectFeature(projectIndex, featureIndex) {
    const project = state.projects[projectIndex];
    if (project && project.features[featureIndex]) {
      project.features[featureIndex].completed = !project.features[featureIndex].completed;
      // Auto update project status
      const completedCount = project.features.filter(f => f.completed).length;
      if (completedCount === project.features.length) {
        project.status = 'Completed';
      } else if (completedCount > 0) {
        project.status = 'In Progress';
      } else {
        project.status = 'Not Started';
      }
    }
  },

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (state.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (state.lastActiveDate === yesterday) {
        state.streakCount += 1;
      } else {
        state.streakCount = 1;
      }
      state.lastActiveDate = today;
    }
  },

  getNextIncompleteDay() {
    const allDays = roadmapData.flatMap(p => p.days);
    const incomplete = allDays.find(d => state.dayStatuses[d.day] !== 'Completed');
    return incomplete ? incomplete.day : 1;
  },

  resetAllProgress() {
    const initial = getInitialState();
    Object.keys(initial).forEach(key => {
      state[key] = initial[key];
    });
  },

  exportData() {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(state, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `ai_dev_roadmap_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importData(importedState) {
    try {
      if (importedState && typeof importedState === 'object') {
        Object.keys(importedState).forEach(key => {
          state[key] = importedState[key];
        });
        return true;
      }
    } catch (e) {
      console.error("Import error:", e);
    }
    return false;
  }
};
