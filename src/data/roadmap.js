export const roadmapData = [
  {
    phase: 1,
    title: "Python Fundamentals",
    days: [
      {
        day: 1,
        topic: "Python Installation & VS Code Setup",
        objectives: ["Set up development environment", "Write first Python script"],
        concepts: ["Python interpreter", "VS Code extensions", "Terminal basics"],
        exercises: ["Install Python 3", "Install VS Code Python extension", "Print 'Hello AI World'"],
        expectedOutcome: "A working Python environment and basic code execution understanding.",
        time: "4 hours",
        resources: [
          { label: "Official Python Install Guide", url: "https://docs.python.org/3/using/index.html" },
          { label: "VS Code Python Tutorial", url: "https://code.visualstudio.com/docs/python/python-tutorial" }
        ],
        tasks: [
          { id: "d1t1", text: "Download and install Python 3.12+", completed: false },
          { id: "d1t2", text: "Install Visual Studio Code", completed: false },
          { id: "d1t3", text: "Install Python and Pylance extensions in VS Code", completed: false },
          { id: "d1t4", text: "Create hello.py and run it from terminal", completed: false }
        ]
      },
      {
        day: 2,
        topic: "Variables and Data Types",
        objectives: ["Understand basic Python types", "Variable assignment"],
        concepts: ["Integers", "Floats", "Strings", "Booleans", "Type casting"],
        exercises: ["Create variables for name, age, and height", "Check types using type()"],
        expectedOutcome: "Ability to store and manipulate basic data types.",
        time: "4 hours",
        resources: [
          { label: "Python Data Types (Real Python)", url: "https://realpython.com/python-data-types/" }
        ],
        tasks: [
          { id: "d2t1", text: "Experiment with string concatenation and f-strings", completed: false },
          { id: "d2t2", text: "Practice arithmetic operations with ints and floats", completed: false },
          { id: "d2t3", text: "Learn about boolean logic and comparisons", completed: false }
        ]
      },
      {
        day: 3,
        topic: "Conditions and Operators",
        objectives: ["Control flow basics", "Logical operations"],
        concepts: ["if/elif/else", "and/or/not", "Comparison operators"],
        exercises: ["Build an age checker", "Build a simple grading system"],
        expectedOutcome: "Mastery of decision-making in Python code.",
        time: "4 hours",
        resources: [
          { label: "Python Conditional Statements", url: "https://realpython.com/python-conditional-statements/" }
        ],
        tasks: [
          { id: "d3t1", text: "Write nested if statements", completed: false },
          { id: "d3t2", text: "Use ternary operators for simple conditions", completed: false }
        ]
      },
      {
        day: 4,
        topic: "Loops",
        objectives: ["Repetitive execution", "Iterating over data"],
        concepts: ["for loops", "while loops", "range() function", "break/continue"],
        exercises: ["Print first 20 even numbers", "Calculate factorial using a loop"],
        expectedOutcome: "Ability to automate repetitive tasks.",
        time: "4 hours",
        resources: [
          { label: "Python Loops (W3Schools)", url: "https://www.w3schools.com/python/python_for_loops.asp" }
        ],
        tasks: [
          { id: "d4t1", text: "Practice iterating through a string", completed: false },
          { id: "d4t2", text: "Implement a while loop with a sentinel value", completed: false }
        ]
      },
      {
        day: 5,
        topic: "Functions",
        objectives: ["Code modularity", "Reusable logic"],
        concepts: ["def keyword", "parameters", "return values", "scope"],
        exercises: ["Create a function to calculate area", "Build a simple greeting function"],
        expectedOutcome: "Understanding how to structure code into reusable blocks.",
        time: "4 hours",
        resources: [
          { label: "Defining Functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" }
        ],
        tasks: [
          { id: "d5t1", text: "Write functions with default arguments", completed: false },
          { id: "d5t2", text: "Learn about positional vs keyword arguments", completed: false }
        ]
      },
      {
        day: 6,
        topic: "Collections: Lists, Tuples, Sets, Dicts",
        objectives: ["Managing groups of data"],
        concepts: ["Indexing", "Slicing", "Mutability", "Key-value pairs"],
        exercises: ["Create a student dictionary", "Manipulate lists using methods like append/pop"],
        expectedOutcome: "Ability to work with complex data structures.",
        time: "4 hours",
        resources: [
          { label: "Data Structures in Python", url: "https://docs.python.org/3/tutorial/datastructures.html" }
        ],
        tasks: [
          { id: "d6t1", text: "Practice list slicing and comprehension", completed: false },
          { id: "d6t2", text: "Learn dictionary methods like items(), keys(), values()", completed: false }
        ]
      },
      {
        day: 7,
        topic: "Classes and Objects",
        objectives: ["Object-Oriented Programming (OOP) basics"],
        concepts: ["class", "init method", "self", "attributes and methods"],
        exercises: ["Create a Car class", "Instantiate multiple objects"],
        expectedOutcome: "Fundamental understanding of OOP patterns.",
        time: "4 hours",
        resources: [
          { label: "Intro to OOP", url: "https://realpython.com/python3-object-oriented-programming/" }
        ],
        tasks: [
          { id: "d7t1", text: "Define methods that modify object state", completed: false },
          { id: "d7t2", text: "Understand the difference between class and instance attributes", completed: false }
        ]
      },
      {
        day: 8,
        topic: "Exception Handling",
        objectives: ["Robust error management"],
        concepts: ["try/except", "finally", "raising exceptions"],
        exercises: ["Handle ZeroDivisionError", "Handle FileNotFoundError"],
        expectedOutcome: "Code that gracefully handles runtime errors.",
        time: "4 hours",
        resources: [
          { label: "Errors and Exceptions", url: "https://docs.python.org/3/tutorial/errors.html" }
        ],
        tasks: [
          { id: "d8t1", text: "Catch specific exceptions vs generic ones", completed: false },
          { id: "d8t2", text: "Use the 'with' statement for resource management", completed: false }
        ]
      },
      {
        day: 9,
        topic: "Modules, Packages, and Venvs",
        objectives: ["Project organization and dependencies"],
        concepts: ["importing", "pip", "venv", "requirements.txt"],
        exercises: ["Create a custom module", "Install external package with pip"],
        expectedOutcome: "Knowing how to manage environments and external libraries.",
        time: "4 hours",
        resources: [
          { label: "Python Modules and Packages", url: "https://realpython.com/python-modules-packages/" }
        ],
        tasks: [
          { id: "d9t1", text: "Create and activate a virtual environment", completed: false },
          { id: "d9t2", text: "Install the 'requests' library", completed: false }
        ]
      },
      {
        day: 10,
        topic: "JSON, File Handling & Git Basics",
        objectives: ["Data persistence and version control"],
        concepts: ["read/write files", "json module", "git init/add/commit"],
        exercises: ["Save user settings to JSON", "Initialize a git repo for a calculator project"],
        expectedOutcome: "Completion of Phase 1 with basic data persistence knowledge.",
        time: "4 hours",
        resources: [
          { label: "Working with JSON", url: "https://realpython.com/python-json/" },
          { label: "Git Guide", url: "https://git-scm.com/doc" }
        ],
        tasks: [
          { id: "d10t1", text: "Project: Create a command-line Calculator with history saved to JSON", completed: false },
          { id: "d10t2", text: "Initialize git and make your first commit", completed: false }
        ]
      }
    ]
  },
  {
    phase: 2,
    title: "AI & LLM Fundamentals",
    days: [
      {
        day: 11,
        topic: "Introduction to Artificial Intelligence",
        objectives: ["Broad understanding of AI landscape"],
        concepts: ["AI definitions", "History", "Current trends"],
        exercises: ["Research AI use cases in your current IT role"],
        expectedOutcome: "Clear vision of AI potential.",
        time: "4 hours",
        resources: [{ label: "AI for Everyone (Coursera)", url: "https://www.coursera.org/learn/ai-for-everyone" }],
        tasks: [{ id: "d11t1", text: "Define AI, ML, and DL in your own words", completed: false }]
      },
      {
        day: 12,
        topic: "Machine Learning vs Deep Learning",
        objectives: ["Differentiating methodologies"],
        concepts: ["Supervised/Unsupervised learning", "Neural Networks"],
        exercises: ["Identify ML applications in daily life"],
        expectedOutcome: "Understanding how computers 'learn' from data.",
        time: "4 hours",
        resources: [{ label: "Intro to ML", url: "https://developers.google.com/machine-learning/crash-course" }],
        tasks: [{ id: "d12t1", text: "Compare classical ML and Deep Learning", completed: false }]
      },
      {
        day: 13,
        topic: "Generative AI and Large Language Models",
        objectives: ["Understanding LLM architecture basics"],
        concepts: ["Transformers", "Generative modeling", "Autoregressive models"],
        exercises: ["Try different LLMs (ChatGPT, Claude, Gemini) and compare"],
        expectedOutcome: "Deep understanding of how LLMs generate text.",
        time: "4 hours",
        resources: [{ label: "Introduction to LLMs", url: "https://cloud.google.com/blog/topics/ai-machine-learning/llm-generative-ai-basics" }],
        tasks: [{ id: "d13t1", text: "Read about the Transformer paper 'Attention is All You Need'", completed: false }]
      },
      {
        day: 14,
        topic: "Prompt Engineering",
        objectives: ["Mastering LLM communication"],
        concepts: ["Zero-shot", "Few-shot", "Chain-of-thought", "System prompts"],
        exercises: ["Draft complex prompts for code generation"],
        expectedOutcome: "Significantly improved LLM outputs.",
        time: "4 hours",
        resources: [{ label: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/" }],
        tasks: [{ id: "d14t1", text: "Apply Chain-of-thought prompting to solve a logic puzzle", completed: false }]
      },
      {
        day: 15,
        topic: "Tokens and Context Windows",
        objectives: ["Understanding technical LLM constraints"],
        concepts: ["Tokenization", "Context limit", "Memory management"],
        exercises: ["Use a tokenizer tool to see how text is split"],
        expectedOutcome: "Ability to optimize prompts for context efficiency.",
        time: "4 hours",
        resources: [{ label: "OpenAI Tokenizer", url: "https://platform.openai.com/tokenizer" }],
        tasks: [{ id: "d15t1", text: "Calculate token usage for a sample document", completed: false }]
      },
      {
        day: 16,
        topic: "Temperature and Model Parameters",
        objectives: ["Fine-tuning model behavior"],
        concepts: ["Temperature", "Top-p", "Frequency penalty", "Stop sequences"],
        exercises: ["Experiment with temperature settings in a Playground"],
        expectedOutcome: "Control over determinism vs creativity in AI.",
        time: "4 hours",
        resources: [{ label: "API Parameter Reference", url: "https://platform.openai.com/docs/api-reference" }],
        tasks: [{ id: "d16t1", text: "Observe how temperature 0.0 vs 1.0 affects code stability", completed: false }]
      },
      {
        day: 17,
        topic: "REST APIs and HTTP",
        objectives: ["Web communication fundamentals"],
        concepts: ["GET/POST", "Headers", "Status codes", "Payloads"],
        exercises: ["Use Postman or Curl to test public APIs"],
        expectedOutcome: "Solid foundation for API integrations.",
        time: "4 hours",
        resources: [{ label: "MDN HTTP Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }],
        tasks: [{ id: "d17t1", text: "Understand the structure of an HTTP Request/Response", completed: false }]
      },
      {
        day: 18,
        topic: "JSON and API Integration",
        objectives: ["Data exchange formats"],
        concepts: ["Parsing JSON", "Handling API errors", "Rate limiting"],
        exercises: ["Integrate a weather or news API in Python"],
        expectedOutcome: "Ability to fetch and process external data.",
        time: "4 hours",
        resources: [{ label: "Python Requests Library", url: "https://requests.readthedocs.io/" }],
        tasks: [{ id: "d18t1", text: "Build a script to fetch and print headlines from a free API", completed: false }]
      },
      {
        day: 19,
        topic: "Structured Outputs",
        objectives: ["Ensuring predictable AI results"],
        concepts: ["JSON mode", "Pydantic models", "Output schemas"],
        exercises: ["Force an LLM to output valid JSON for a list of items"],
        expectedOutcome: "AI outputs that can be parsed by code automatically.",
        time: "4 hours",
        resources: [{ label: "OpenAI Structured Outputs", url: "https://platform.openai.com/docs/guides/structured-outputs" }],
        tasks: [{ id: "d19t1", text: "Define a JSON schema for a 'User Profile'", completed: false }]
      },
      {
        day: 20,
        topic: "Function Calling and Tool Calling",
        objectives: ["Giving LLMs 'hands'"],
        concepts: ["Tool definitions", "Argument extraction", "Closing the loop"],
        exercises: ["Define a tool that calculates math and have LLM call it"],
        expectedOutcome: "End-to-end understanding of tool-augmented AI.",
        time: "4 hours",
        resources: [{ label: "Tool Calling Guide", url: "https://platform.openai.com/docs/guides/function-calling" }],
        tasks: [
          { id: "d20t1", text: "Project: Build a simple Chatbot that can 'get current time' using tool calling", completed: false }
        ]
      }
    ]
  },
  {
    phase: 3,
    title: "AI Coding & Automation",
    days: [
      {
        day: 21,
        topic: "Claude Code Installation and Setup",
        objectives: ["Deploying advanced AI CLI tools"],
        concepts: ["Claude Code", "CLI authentication", "Project context"],
        exercises: ["Install and authorize Claude Code in your terminal"],
        expectedOutcome: "A ready-to-use AI coding partner in your terminal.",
        time: "4 hours",
        resources: [{ label: "Claude Code Documentation", url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code" }],
        tasks: [{ id: "d21t1", text: "Run 'claude' command and explore help menu", completed: false }]
      },
      {
        day: 22,
        topic: "Claude Code Commands and Workflow",
        objectives: ["Mastering CLI AI interaction"],
        concepts: ["Slash commands", "Task planning", "Diff reviews"],
        exercises: ["Use Claude to explore a new repository"],
        expectedOutcome: "Efficient CLI-based development workflow.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d22t1", text: "Practice /compact, /clear, and /review commands", completed: false }]
      },
      {
        day: 23,
        topic: "Understanding Existing Codebases",
        objectives: ["AI-assisted reverse engineering"],
        concepts: ["Code indexing", "Grep-ing with AI", "Architecture mapping"],
        exercises: ["Ask Claude to explain the flow of a Vue component"],
        expectedOutcome: "Rapid comprehension of unfamiliar code.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d23t1", text: "Generate a summary of project structure using Claude", completed: false }]
      },
      {
        day: 24,
        topic: "AI-Powered Code Generation",
        objectives: ["High-speed development"],
        concepts: ["Incremental changes", "Pattern matching", "Refactoring"],
        exercises: ["Request a new feature for your calculator project"],
        expectedOutcome: "Ability to build features in minutes vs hours.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d24t1", text: "Use Claude to generate a unit test for a Python function", completed: false }]
      },
      {
        day: 25,
        topic: "Debugging with Claude Code",
        objectives: ["Solving bugs with AI reasoning"],
        concepts: ["Stack trace analysis", "Hypothesis testing", "Log checking"],
        exercises: ["Intentionally break your code and ask AI to fix it"],
        expectedOutcome: "Significantly reduced debugging time.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d25t1", text: "Feed an error log to Claude and apply the suggested fix", completed: false }]
      },
      {
        day: 26,
        topic: "Code Review and Testing",
        objectives: ["Quality assurance with AI"],
        concepts: ["Security auditing", "Clean code standards", "Test coverage"],
        exercises: ["Ask Claude to perform a security review of your API code"],
        expectedOutcome: "Higher code quality and safer applications.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d26t1", text: "Apply suggested improvements from an AI code review", completed: false }]
      },
      {
        day: 27,
        topic: "n8n Installation and Setup",
        objectives: ["Visual workflow automation basics"],
        concepts: ["Low-code automation", "Self-hosting vs Cloud", "Docker basics"],
        exercises: ["Install n8n locally or sign up for cloud trial"],
        expectedOutcome: "Working automation platform environment.",
        time: "4 hours",
        resources: [{ label: "n8n Documentation", url: "https://docs.n8n.io/" }],
        tasks: [{ id: "d27t1", text: "Start n8n and create your first empty workflow", completed: false }]
      },
      {
        day: 28,
        topic: "n8n Workflow Fundamentals",
        objectives: ["Building data pipelines"],
        concepts: ["Nodes", "Triggers", "Data mapping", "Expressions"],
        exercises: ["Create a workflow that saves emails to a spreadsheet"],
        expectedOutcome: "Basic proficiency in visual programming.",
        time: "4 hours",
        resources: [{ label: "n8n Academy", url: "https://academy.n8n.io/" }],
        tasks: [{ id: "d28t1", text: "Use 'If' and 'Merge' nodes in a workflow", completed: false }]
      },
      {
        day: 29,
        topic: "n8n AI Agent Nodes and Tools",
        objectives: ["AI-powered workflows"],
        concepts: ["AI Agent Node", "Tool Node", "LLM Chain Node"],
        exercises: ["Add an AI node to summarize incoming webhooks"],
        expectedOutcome: "Ability to inject intelligence into automations.",
        time: "4 hours",
        resources: [{ label: "n8n LangChain Nodes", url: "https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.ai-agent/" }],
        tasks: [{ id: "d29t1", text: "Connect an OpenAI or Anthropic API to n8n", completed: false }]
      },
      {
        day: 30,
        topic: "Mini AI Automation Project",
        objectives: ["Applying automation skills"],
        concepts: ["End-to-end integration", "Workflow testing"],
        exercises: ["Build a project: Auto-reply to Slack messages using AI"],
        expectedOutcome: "A working, valuable AI automation.",
        time: "4 hours",
        resources: [],
        tasks: [
          { id: "d30t1", text: "Project: Build an n8n workflow that monitors a source and notifies you with an AI summary", completed: false }
        ]
      }
    ]
  },
  {
    phase: 4,
    title: "Build Your First AI Agent",
    days: [
      {
        day: 31,
        topic: "AI Agent Architecture",
        objectives: ["Deep dive into 'Agential' patterns"],
        concepts: ["Looping", "Self-correction", "Statefulness", "Agency"],
        exercises: ["Diagram an agent flow for a complex task"],
        expectedOutcome: "Conceptual clarity on why agents differ from chains.",
        time: "4 hours",
        resources: [{ label: "LLM Powered Autonomous Agents", url: "https://lilianweng.github.io/posts/2023-06-23-agent/" }],
        tasks: [{ id: "d31t1", text: "Identify the 4 main components of an agent: Planning, Memory, Tools, Execution", completed: false }]
      },
      {
        day: 32,
        topic: "Agent Planning and Execution",
        objectives: ["Understanding ReAct pattern"],
        concepts: ["Reason + Act", "Plan-and-Execute", "Reflection"],
        exercises: ["Trace a ReAct loop in a log file"],
        expectedOutcome: "Understanding how agents 'think' before they 'act'.",
        time: "4 hours",
        resources: [{ label: "ReAct Paper Explained", url: "https://www.promptingguide.ai/techniques/react" }],
        tasks: [{ id: "d32t1", text: "Compare Sequential vs Agential execution", completed: false }]
      },
      {
        day: 33,
        topic: "Tools and Function Calling (Deep Dive)",
        objectives: ["Advanced tool integration"],
        concepts: ["Complex schemas", "Error handling in tools", "Multi-tool selection"],
        exercises: ["Write a Python function that scrapes a website for an agent"],
        expectedOutcome: "Knowledge of building high-quality tools for LLMs.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d33t1", text: "Learn how to document functions so LLMs understand them better", completed: false }]
      },
      {
        day: 34,
        topic: "Connecting External Tools",
        objectives: ["Expanding agent capabilities"],
        concepts: ["Web search", "Calculators", "DB connectors"],
        exercises: ["Integrate Tavily or Google Search API into your agent"],
        expectedOutcome: "Agents that can access real-time information.",
        time: "4 hours",
        resources: [{ label: "Tavily Search API", url: "https://tavily.com/" }],
        tasks: [{ id: "d34t1", text: "Use a search tool to answer a question about today's news", completed: false }]
      },
      {
        day: 35,
        topic: "Agent Memory",
        objectives: ["Persistent agent states"],
        concepts: ["Short-term vs Long-term memory", "Thread management"],
        exercises: ["Implement a simple local file-based memory for your chatbot"],
        expectedOutcome: "Agents that 'remember' you across sessions.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d35t1", text: "Understand memory summarization vs windowing", completed: false }]
      },
      {
        day: 36,
        topic: "Conversation History",
        objectives: ["Contextual consistency"],
        concepts: ["Message history", "Trim/Summary strategies", "User identity"],
        exercises: ["Build a system that prunes old messages to save tokens"],
        expectedOutcome: "Cost-efficient long-term AI conversations.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d36t1", text: "Implement a 'sliding window' for chat history", completed: false }]
      },
      {
        day: 37,
        topic: "RAG Fundamentals",
        objectives: ["Retrieval Augmented Generation basics"],
        concepts: ["Knowledge base", "Chunks", "Retrieval", "Context injection"],
        exercises: ["Manually inject a text file's content into a prompt"],
        expectedOutcome: "Basic understanding of how to give AI specific knowledge.",
        time: "4 hours",
        resources: [{ label: "What is RAG?", url: "https://aws.amazon.com/what-is/retrieval-augmented-generation/" }],
        tasks: [{ id: "d37t1", text: "Understand the 'Retrieve -> Augment -> Generate' pipeline", completed: false }]
      },
      {
        day: 38,
        topic: "Embeddings and Document Search",
        objectives: ["Semantic search mechanics"],
        concepts: ["Vector embeddings", "Cosine similarity", "Vector databases"],
        exercises: ["Generate embeddings for 5 sentences and compare similarity"],
        expectedOutcome: "Knowledge of how AI 'finds' relevant information.",
        time: "4 hours",
        resources: [{ label: "OpenAI Embeddings Guide", url: "https://platform.openai.com/docs/guides/embeddings" }],
        tasks: [{ id: "d38t1", text: "Research vector DBs: ChromaDB, Pinecone, or Weaviate", completed: false }]
      },
      {
        day: 39,
        topic: "FastAPI Fundamentals",
        objectives: ["Building modern Python backends"],
        concepts: ["Endpoints", "Pydantic models", "Async/Await", "Swagger UI"],
        exercises: ["Create a 'Hello World' API with one GET endpoint"],
        expectedOutcome: "Ability to serve your agents over the web.",
        time: "4 hours",
        resources: [{ label: "FastAPI Official Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" }],
        tasks: [{ id: "d39t1", text: "Build a POST endpoint that accepts and returns JSON", completed: false }]
      },
      {
        day: 40,
        topic: "Project 1: AI Document Assistant",
        objectives: ["Putting Phase 4 together"],
        concepts: ["PDF parsing", "RAG implementation", "FastAPI integration"],
        exercises: ["Build an app where you upload a PDF and ask questions about it"],
        expectedOutcome: "A functional, valuable AI Agent application.",
        time: "8 hours",
        resources: [],
        tasks: [
          { id: "d40t1", text: "Implement PDF text extraction", completed: false },
          { id: "d40t2", text: "Implement semantic search over document chunks", completed: false },
          { id: "d40t3", text: "Expose functionality via FastAPI", completed: false }
        ]
      }
    ]
  },
  {
    phase: 5,
    title: "Advanced AI Agents",
    days: [
      {
        day: 41,
        topic: "LangGraph Introduction",
        objectives: ["Controlling agentic workflows"],
        concepts: ["Cyclic graphs", "Nodes and Edges", "LangChain ecosystem"],
        exercises: ["Install LangGraph and run a basic example"],
        expectedOutcome: "Transition from simple chains to complex graphs.",
        time: "4 hours",
        resources: [{ label: "LangGraph Documentation", url: "https://langchain-ai.github.io/langgraph/" }],
        tasks: [{ id: "d41t1", text: "Understand why graphs are better for complex agents", completed: false }]
      },
      {
        day: 42,
        topic: "LangGraph Nodes and Edges",
        objectives: ["Building the graph structure"],
        concepts: ["StateGraph", "Conditional edges", "Entry points"],
        exercises: ["Build a 3-node linear graph"],
        expectedOutcome: "Ability to define custom logic steps.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d42t1", text: "Implement a graph that routes based on LLM output", completed: false }]
      },
      {
        day: 43,
        topic: "State Management",
        objectives: ["Handling data across nodes"],
        concepts: ["State schemas", "TypedDict", "Reducer functions"],
        exercises: ["Create a graph that maintains a 'counter' in its state"],
        expectedOutcome: "Proficiency in managing complex agential data.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d43t1", text: "Learn how to 'update' state vs 'replace' it", completed: false }]
      },
      {
        day: 44,
        topic: "Agent Workflows",
        objectives: ["Designing business logic"],
        concepts: ["Validation loops", "Formatting steps", "Decision nodes"],
        exercises: ["Design a workflow for an automated blog writer"],
        expectedOutcome: "Thinking in terms of processes, not just prompts.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d44t1", text: "Build a loop that checks code for syntax errors before finishing", completed: false }]
      },
      {
        day: 45,
        topic: "Multi-Step Agents",
        objectives: ["Long-running tasks"],
        concepts: ["Checkpoints", "Persistence", "Interrupts"],
        exercises: ["Implement a graph that can 'pause' and 'resume'"],
        expectedOutcome: "Knowledge of building production-ready agents.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d45t1", text: "Use LangGraph persistence to save agent state to a DB", completed: false }]
      },
      {
        day: 46,
        topic: "Multi-Agent Fundamentals",
        objectives: ["Collaboration between AI entities"],
        concepts: ["Manager pattern", "Peer-to-peer", "Role specialization"],
        exercises: ["Build a Researcher + Writer multi-agent system"],
        expectedOutcome: "Understanding 'Team AI' architectures.",
        time: "4 hours",
        resources: [{ label: "Multi-Agent Systems", url: "https://blog.langchain.dev/langgraph-multi-agent-workflows/" }],
        tasks: [{ id: "d46t1", text: "Design a hierarchy for a 3-agent team", completed: false }]
      },
      {
        day: 47,
        topic: "Human-in-the-Loop Approval",
        objectives: ["Safety and control"],
        concepts: ["Breakpoint", "Human review", "State editing"],
        exercises: ["Add a step where a human must approve a tool call"],
        expectedOutcome: "Building agents that are safe for production.",
        time: "4 hours",
        resources: [{ label: "Human-in-the-loop Guide", url: "https://langchain-ai.github.io/langgraph/how-tos/human-in-the-loop/" }],
        tasks: [{ id: "d47t1", text: "Implement a 'Wait for Approval' node in LangGraph", completed: false }]
      },
      {
        day: 48,
        topic: "Error Handling and Retries",
        objectives: ["Agentic resilience"],
        concepts: ["Retry logic", "Fallback models", "Graceful failure"],
        exercises: ["Build a system that switches to a cheaper model if main fails"],
        expectedOutcome: "Highly reliable AI applications.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d48t1", text: "Implement an exponential backoff for API calls", completed: false }]
      },
      {
        day: 49,
        topic: "Agent Testing and Evaluation",
        objectives: ["Measuring performance"],
        concepts: ["Evals", "Golden sets", "LLM-as-a-judge"],
        exercises: ["Create 10 test cases and 'grade' AI responses"],
        expectedOutcome: "Data-driven approach to AI development.",
        time: "4 hours",
        resources: [{ label: "Evaluating LLM Apps", url: "https://www.deeplearning.ai/short-courses/evaluating-and-debugging-generative-ai/" }],
        tasks: [{ id: "d49t1", text: "Research evaluation frameworks like RAGAS or LangSmith", completed: false }]
      },
      {
        day: 50,
        topic: "Project 2: AI Customer Support Agent",
        objectives: ["Advanced agential project"],
        concepts: ["Multi-agent team", "Human-in-the-loop", "Stateful persistence"],
        exercises: ["Build an agent that handles support tickets with human escalation"],
        expectedOutcome: "A professional-grade AI Agent prototype.",
        time: "8 hours",
        resources: [],
        tasks: [
          { id: "d50t1", text: "Implement automated knowledge base lookup", completed: false },
          { id: "d50t2", text: "Implement escalation logic to human support", completed: false },
          { id: "d50t3", text: "Add conversation memory and state tracking", completed: false }
        ]
      }
    ]
  },
  {
    phase: 6,
    title: "Final Portfolio Project",
    days: [
      {
        day: 51,
        topic: "Final Project Planning",
        objectives: ["Strategic project scoping"],
        concepts: ["User stories", "MVP definition", "Tech stack choice"],
        exercises: ["Draft the requirements for 'AI Developer Assistant'"],
        expectedOutcome: "A clear roadmap for your final 10 days.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d51t1", text: "List all features for Project 3", completed: false }]
      },
      {
        day: 52,
        topic: "Application Architecture",
        objectives: ["System design"],
        concepts: ["Database schema", "API structure", "Frontend-Backend flow"],
        exercises: ["Diagram the full system architecture"],
        expectedOutcome: "Solid structural plan for the portfolio project.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d52t1", text: "Decide on DB (PostgreSQL, MongoDB) and Vector DB", completed: false }]
      },
      {
        day: 53,
        topic: "Vue.js Frontend Development",
        objectives: ["Building the UI"],
        concepts: ["Component design", "State management (Pinia)", "API consumption"],
        exercises: ["Build the main dashboard for your assistant"],
        expectedOutcome: "A professional, responsive user interface.",
        time: "6 hours",
        resources: [],
        tasks: [{ id: "d53t1", text: "Implement chat interface with markdown support", completed: false }]
      },
      {
        day: 54,
        topic: "Python FastAPI Backend",
        objectives: ["Building the brain"],
        concepts: ["API routes", "Background tasks", "JWT Auth (optional)"],
        exercises: ["Set up the core API services"],
        expectedOutcome: "A functional backend ready for AI logic.",
        time: "6 hours",
        resources: [],
        tasks: [{ id: "d54t1", text: "Implement file upload and processing endpoints", completed: false }]
      },
      {
        day: 55,
        topic: "AI Agent Integration",
        objectives: ["Connecting the AI"],
        concepts: ["LangGraph workflow", "LLM integration", "Streaming"],
        exercises: ["Connect the backend to your advanced LangGraph agent"],
        expectedOutcome: "End-to-end agential capability.",
        time: "6 hours",
        resources: [],
        tasks: [{ id: "d55t1", text: "Implement streaming responses to the frontend", completed: false }]
      },
      {
        day: 56,
        topic: "Tool Calling and Memory",
        objectives: ["Expanding capabilities"],
        concepts: ["Custom toolsets", "Session-based memory"],
        exercises: ["Build a 'Code Search' tool for your assistant"],
        expectedOutcome: "An assistant that can actually 'do' work on files.",
        time: "6 hours",
        resources: [],
        tasks: [{ id: "d56t1", text: "Add persistent database-backed memory", completed: false }]
      },
      {
        day: 57,
        topic: "Error Handling and Security",
        objectives: ["Production hardening"],
        concepts: ["Input validation", "Prompt injection prevention", "Rate limiting"],
        exercises: ["Audit your application for security vulnerabilities"],
        expectedOutcome: "A secure and resilient application.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d57t1", text: "Add error boundaries and toast notifications", completed: false }]
      },
      {
        day: 58,
        topic: "Testing and Debugging",
        objectives: ["Ensuring quality"],
        concepts: ["Integration testing", "User testing", "Edge case handling"],
        exercises: ["Run a full battery of tests on all features"],
        expectedOutcome: "Bug-free final application.",
        time: "4 hours",
        resources: [],
        tasks: [{ id: "d58t1", text: "Fix at least 3 UI/UX issues found during testing", completed: false }]
      },
      {
        day: 59,
        topic: "GitHub Documentation and Deployment",
        objectives: ["Showcasing your work"],
        concepts: ["README writing", "Dockerizing", "Deployment"],
        exercises: ["Deploy your project to Render, Vercel, or Fly.io"],
        expectedOutcome: "A live, sharable portfolio project.",
        time: "4 hours",
        resources: [{ label: "Writing Great READMEs", url: "https://github.com/matiassingers/awesome-readme" }],
        tasks: [{ id: "d59t1", text: "Record a short demo video of your project", completed: false }]
      },
      {
        day: 60,
        topic: "Final Review and Interview Prep",
        objectives: ["Transitioning to your new role"],
        concepts: ["AI Agent interview questions", "Resume update", "Next steps"],
        exercises: ["Practice explaining your 'AI Developer Assistant' architecture"],
        expectedOutcome: "Readiness for AI Developer job opportunities.",
        time: "4 hours",
        resources: [],
        tasks: [
          { id: "d60t1", text: "Update LinkedIn with new 'AI Agent Developer' skills", completed: false },
          { id: "d60t2", text: "Celebrate! You are now an AI Agent Developer", completed: false }
        ]
      }
    ]
  }
];
