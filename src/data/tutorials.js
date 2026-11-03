import { roadmapData } from './roadmap';

// Helper to generate rich 15-point tutorial content for any day
export const getTutorialForDay = (dayNum) => {
  const allDays = roadmapData.flatMap(p => p.days);
  const dayInfo = allDays.find(d => d.day === dayNum) || allDays[0];
  const phaseInfo = roadmapData.find(p => p.days.some(d => d.day === dayNum)) || roadmapData[0];

  // Base tutorial object
  let tutorial = {
    day: dayInfo.day,
    title: dayInfo.topic,
    phase: phaseInfo.title,
    phaseNum: phaseInfo.phase,
    estimatedTime: dayInfo.time || "4 hours",

    // 1. Introduction
    introduction: `Welcome to Day ${dayInfo.day}: ${dayInfo.topic}. In this module, you will master essential concepts in ${phaseInfo.title}. This skill is crucial for AI Agent Developers because it forms the foundational building block for automated pipelines, intelligent tool execution, and robust backend engineering.`,

    // 2. Telugu-English Simple Explanation
    bilingualExplanation: `Eeroju manam ${dayInfo.topic} gurinchi nerchukundam. (Today we will learn about ${dayInfo.topic}). Idi chala simple and important topic! AI agents build cheyyadaniki, ee concepts chala mukhyam. Chooddam ela work avtundo step-by-step!`,

    // 3. Concepts & Terminology
    concepts: dayInfo.concepts || ["Core Syntax", "Execution Flow", "Best Practices"],

    // 4. Syntax & Practical Examples
    syntaxExample: `# Basic syntax pattern for Day ${dayInfo.day}
def ai_developer_routine():
    print("Executing Day ${dayInfo.day}: ${dayInfo.topic}")
    # Core logic goes here
    return "Success"

result = ai_developer_routine()
print(result)`,

    // 5. Complete Working Code Example
    workingCode: `import json
import sys

class AIDevModule${dayInfo.day}:
    def __init__(self, topic):
        self.topic = topic
        self.status = "Active"

    def execute_task(self):
        print(f"Running module: {self.topic}")
        data = {"day": ${dayInfo.day}, "topic": self.topic, "status": "Completed"}
        return json.dumps(data, indent=2)

if __name__ == "__main__":
    module = AIDevModule${dayInfo.day}("${dayInfo.topic}")
    print(module.execute_task())`,

    // 6. Line-by-Line Explanation
    codeExplanation: [
        "Line 1-2: Import necessary modules (json for serialization, sys for system operations).",
        "Line 4-7: Define a dedicated class AIDevModule to encapsulate daily learning logic and state.",
        "Line 9-12: execute_task method prints status and constructs a structured JSON dictionary.",
        "Line 14-17: Instantiate the class with today's topic and execute the workflow."
    ],

    // 7. Expected Output
    expectedOutput: `{
  "day": ${dayInfo.day},
  "topic": "${dayInfo.topic}",
  "status": "Completed"
}`,

    // 8. Real-World Use Cases
    useCases: [
      "Automating data ingestion pipelines for LLM fine-tuning.",
      "Building robust tool wrappers for AI Agent execution loops.",
      "Handling structured JSON responses from Claude and OpenAI APIs."
    ],

    // 9. Common Errors & Solutions
    commonErrors: [
      {
        error: "SyntaxError or IndentationError in Python scripts.",
        solution: "Ensure 4 spaces indentation consistently and check for unclosed brackets."
      },
      {
        error: "JSONDecodeError when parsing API responses.",
        solution: "Validate that the LLM response is wrapped in valid JSON or use structured output schemas."
      }
    ],

    // 10. Exercises (Beginner, Intermediate, Advanced)
    exercises: {
      beginner: "Write a simple script that prints your learning goals for Day " + dayInfo.day + ".",
      intermediate: "Modify the working code example to accept user input and save results to a local JSON file.",
      advanced: "Build an automated wrapper function with error retry logic and exception logging."
    },

    // 11. Hints & Solutions
    hints: {
      beginner: "Use the built-in print() function with f-strings.",
      intermediate: "Use Python's 'with open(filename, 'w') as f:' context manager.",
      advanced: "Use try...except blocks with a for loop for retry attempts."
    },
    solutions: {
      beginner: `print("My goal for Day ${dayInfo.day} is to master ${dayInfo.topic}!")`,
      intermediate: `import json\ndata = {"day": ${dayInfo.day}}\nwith open("progress.json", "w") as f: json.dump(data, f)`,
      advanced: `for attempt in range(3):\n    try:\n        # operation\n        break\n    except Exception as e:\n        print(f"Retry {attempt}: {e}")`
    },

    // 12. Interview Questions (5)
    interviewQuestions: [
      { q: `What is the primary purpose of ${dayInfo.topic} in AI Agent development?`, a: "It provides the structural reliability and data handling required for autonomous execution." },
      { q: "How do you handle runtime errors effectively in production?", a: "By implementing structured try/except blocks, logging, and fallback mechanisms." },
      { q: "Why is modular code structure important for AI systems?", a: "It allows individual agent tools and prompts to be tested and updated independently." },
      { q: "How does this concept tie into LLM prompt engineering?", a: "Structured outputs and clean code enable seamless communication between code and LLM tool calls." },
      { q: "What best practices should you follow when writing this code?", a: "Keep functions small, use type hints, and write comprehensive unit tests." }
    ],

    // 13. MCQs (5)
    mcqs: [
      {
        question: `Which of the following best describes ${dayInfo.topic}?`,
        options: ["An optional feature", "A core foundational building block", "A deprecated method", "A hardware component"],
        correct: 1,
        explanation: "It is a core foundational building block for AI development."
      },
      {
        question: "What tool is recommended for managing Python dependencies?",
        options: ["npm", "pip and virtual environments (venv)", "composer", "maven"],
        correct: 1,
        explanation: "pip and venv are standard for Python project isolation."
      },
      {
        question: "How should you debug unexpected output in your script?",
        options: ["Ignore it", "Use print debugging or debugger breakpoints", "Delete the file", "Restart computer"],
        correct: 1,
        explanation: "Systematic debugging with print statements or debuggers pinpoints root causes."
      },
      {
        question: "Why use JSON for saving configuration data?",
        options: ["It is unreadable", "It is lightweight, human-readable, and universally supported", "It requires a database", "It is encrypted"],
        correct: 1,
        explanation: "JSON is the standard lightweight data interchange format."
      },
      {
        question: "What is the daily learning commitment for this roadmap?",
        options: ["10 minutes", "4+ hours", "1 week", "1 hour per month"],
        correct: 1,
        explanation: "The recommended commitment is 4+ hours daily."
      }
    ],

    // 14. Lesson Summary
    summary: `Today on Day ${dayInfo.day}, you successfully explored ${dayInfo.topic}. You now understand the core terminology, syntax, practical code patterns, and real-world application for AI Agent engineering.`,

    // 15. Free Documentation Links
    resources: dayInfo.resources || [
      { label: "Python Official Docs", url: "https://docs.python.org/3/" },
      { label: "OpenAI API Guide", url: "https://platform.openai.com/docs/" }
    ]
  };

  // 6. SPECIALIZED PROJECT CONTENT FOR DAY 40: AI Document Assistant
  if (dayNum === 40) {
    tutorial.introduction = "Phase 4 Project: AI Document Assistant. Today you will build a complete RAG (Retrieval Augmented Generation) system that can read PDFs and answer questions based on their content.";
    tutorial.workingCode = `import os
from fastapi import FastAPI, UploadFile
from pypdf import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI

app = FastAPI()

@app.post("/ask-document/")
async def ask_doc(file: UploadFile, query: str):
    # 1. Extract text from PDF
    reader = PdfReader(file.file)
    raw_text = "".join([page.extract_text() for page in reader.pages])

    # 2. Chunk text
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_text(raw_text)

    # 3. Create Vector DB
    vector_db = FAISS.from_texts(chunks, OpenAIEmbeddings())

    # 4. Search and Answer
    docs = vector_db.similarity_search(query)
    llm = ChatOpenAI(model="gpt-4-turbo")
    context = "\\n".join([d.page_content for d in docs])
    prompt = f"Answer query: {query} based on context: {context}"
    answer = llm.invoke(prompt)

    return {"answer": answer.content, "sources": [d.metadata for d in docs]}
`;
    tutorial.codeExplanation = [
      "FastAPI handles the API endpoints.",
      "PdfReader extracts raw text from uploaded files.",
      "CharacterTextSplitter breaks text into manageable pieces for LLM context.",
      "FAISS + OpenAIEmbeddings builds a local searchable semantic index.",
      "similarity_search finds relevant document sections for the query."
    ];
  }

  // SPECIALIZED PROJECT CONTENT FOR DAY 50: AI Customer Support Agent
  if (dayNum === 50) {
    tutorial.title = "Project 2: AI Customer Support Agent with LangGraph";
    tutorial.introduction = "Phase 5 Project: Advanced AI Customer Support. Build a stateful, multi-step support agent with human-in-the-loop escalation using LangGraph.";
    tutorial.workingCode = `from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI

class AgentState(TypedDict):
    query: str
    history: List[str]
    needs_escalation: bool
    answer: str

def support_agent(state: AgentState):
    llm = ChatOpenAI(model="gpt-4")
    response = llm.invoke(f"Customer Query: {state['query']}. History: {state['history']}. Should we escalate?")
    # Logic to decide escalation vs answering
    return {"answer": response.content, "needs_escalation": False}

workflow = StateGraph(AgentState)
workflow.add_node("support", support_agent)
workflow.set_entry_point("support")
workflow.add_edge("support", END)
app = workflow.compile()
`;
  }

  // SPECIALIZED PROJECT CONTENT FOR DAY 60: AI Developer Assistant
  if (dayNum === 60) {
    tutorial.title = "Project 3: AI Developer Assistant (Final Portfolio)";
    tutorial.introduction = "Final Project: AI Developer Assistant. This is your portfolio masterpiece. A full-stack application with Vue.js, FastAPI, and an AI Agent that helps developers write, debug, and document code.";
    tutorial.workingCode = `# Full architecture logic
# 1. Vue.js Dashboard for UI
# 2. FastAPI for Backend Service
# 3. LangGraph for Agent Workflows
# 4. Docker for Deployment
def start_final_project():
    print("System Architecture Initialized")
    # Multi-agent collaboration logic goes here
    return "AI Developer Assistant Live!"
`;
  }

  return tutorial;
};
