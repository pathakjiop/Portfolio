export type WorkLink = { label: string; meta: string; href: string };

export type WorkShowcaseItem = {
  src: string;
  kicker: string;
  title: string;
  description: string;
};

export type WorkArchitecture = {
  frontend?: string;
  backend?: string;
  database?: string;
  services?: string;
};

export type Work = {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  kind: string;
  statusBadge: "ACTIVE BUILD" | "PROTOTYPE" | "PRODUCTION" | "RESEARCH" | "CHALLENGE" | "UTILITY";
  status: string;
  year: string;
  tags: string[];
  filterCategories: string[];
  excerpt: string;
  body: string[];
  problem: string;
  solution: string;
  architecture: WorkArchitecture;
  keyFeatures: string[];
  challenges: string;
  safetyNote?: string;
  note?: string;
  cover: string;
  gallery: string[];
  showcase?: WorkShowcaseItem[];
  links: WorkLink[];
  featured?: boolean;
};

export const socials = [
  { label: "GitHub", href: "https://github.com/pathakjiop/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pathak-ji-op/" },
  { label: "LeetCode", href: "https://leetcode.com/u/atharvpathakop/" },
];

export const email = "atharvpathak248@gmail.com";

export const cities = [
  { city: "India", tz: "Asia/Kolkata", home: true, label: "IST" },
  { city: "Sydney", tz: "Australia/Sydney", home: false, label: "AEDT" },
  { city: "Tokyo", tz: "Asia/Tokyo", home: false, label: "JST" },
  { city: "Berlin", tz: "Europe/Berlin", home: false, label: "CEST" },
  { city: "London", tz: "Europe/London", home: false, label: "BST" },
];

export const services = [
  {
    n: "01",
    title: "Full-Stack Development",
    items: [
      "Python Backend (FastAPI/Django)",
      "React / Next.js / TypeScript",
      "REST & WebSocket APIs",
      "PostgreSQL & Supabase",
      "OAuth 2.0 / JWT Auth Systems",
    ],
  },
  {
    n: "02",
    title: "Automation & Data",
    items: [
      "Browser Automation (Playwright)",
      "Message Queues (RabbitMQ)",
      "Idempotent Worker Pipelines",
      "Batch Scraping & ETL",
      "WhatsApp & Webhook Delivery",
    ],
  },
  {
    n: "03",
    title: "AI & Systems Engineering",
    items: [
      "LLM Agent Integration",
      "Computer Vision & OCR Pipelines",
      "Security Execution Gateways",
      "Rust & Terminal UIs (Ratatui)",
      "Confidence-Aware AI Guardrails",
    ],
  },
];

export const toolkit = [
  {
    n: "01",
    title: "languages",
    items: [
      "python",
      "rust",
      "typescript",
      "javascript",
      "c++",
      "java",
      "sql",
    ],
  },
  {
    n: "02",
    title: "frameworks & backends",
    items: [
      "fastapi",
      "react.js",
      "next.js",
      "tailwind css",
      "node.js / express",
      "hono / bun",
      "postgresql",
      "supabase",
    ],
  },
  {
    n: "03",
    title: "ai, automation & tools",
    items: [
      "playwright",
      "rabbitmq",
      "tesseract / easyocr",
      "ratatui",
      "docker",
      "claude & gemini apis",
    ],
  },
];

export const experience = [
  {
    when: "May 2026 — June 2026",
    role: "Software Developer Intern",
    company: "Pureframe Labs Pvt. Ltd.",
    rest: " · Automated scraping & document delivery pipeline for 25k+ records",
  },
  {
    when: "Present",
    role: "Team Leader",
    company: "Google Solution Challenge",
    rest: " · Ayurvedic Information System & developer workshops",
  },
  {
    when: "Present",
    role: "Java Module Mentor",
    company: "FabLab",
    rest: " · Mentorship & student software guidance",
  },
];

export const filters = [
  "All",
  "AI & ML",
  "Backend & APIs",
  "Automation",
  "Systems & Tools",
  "Full-Stack",
];

export const works: Work[] = [
  {
    slug: "mednoteclassifier",
    title: "MedNoteClassifier — Clinical Feature Span Extraction",
    shortTitle: "MedNote",
    subtitle: "Clinical NLP Suite & Interactive Web Application",
    kind: "CLINICAL NLP / FULL-STACK AI",
    statusBadge: "ACTIVE BUILD",
    status: "Clinical NLP Suite & Benchmark Platform",
    year: "2026",
    tags: ["NLP", "PYTORCH", "REACT 19", "FASTAPI", "TRANSFORMERS"],
    filterCategories: ["AI & ML", "Full-Stack", "Backend & APIs"],
    excerpt: "A full-stack clinical NLP solution for automated span extraction on the NBME® Clinical Patient Notes dataset, pairing PyTorch sequence tagging with a React 19 interactive annotation dashboard.",
    body: [
      "MedNoteClassifier is a clinical NLP solution designed for automated span extraction on the NBME® — Score Clinical Patient Notes dataset (USMLE® Step 2 Clinical Skills). The system identifies exact character offsets [start, end] in unstructured patient notes corresponding to standardized rubric concepts (e.g., 'heart pounding', 'family history of MI').",
      "The workspace bundles a high-performance Python machine learning engine with a modern React 19 & Vite web application. The ML pipeline ensembles an Exact Lexicon Matcher with strict word-boundary enforcement, a Hybrid Character N-Gram Logistic Regression model, a PyTorch BIO sequence Transformer, and hooks for fine-tuned PubMedBERT models.",
      "The interactive web dashboard provides clinicians and researchers with real-time text tokenization, span visual highlighting, and comparative micro-F1 benchmark evaluation across candidate model checkpoints."
    ],
    problem: "Unstructured clinical patient notes contain vital diagnostic criteria buried in free-text prose, making manual grading, rubric alignment, and standardized extraction tedious and prone to inter-annotator variance.",
    solution: "An end-to-end clinical NLP span extraction pipeline combining lexicon matching, hybrid n-gram classification, and deep transformer sequence tagging, served through a real-time annotation and benchmarking web interface.",
    architecture: {
      frontend: "React 19, Vite, TanStack Router, and Tailwind CSS v4",
      backend: "Node.js & Express API bridge with Python 3.10+ subprocess execution",
      database: "NBME patient notes corpus, Kaggle evaluation rubrics, and serialized PyTorch checkpoints",
      services: "PyTorch BIO Transformer, DistilBERT / PubMedBERT fine-tuning, Character-level Micro-F1 evaluation engine",
    },
    keyFeatures: [
      "Exact character-level offset decoder ([start, end]) for unstructured clinical patient notes",
      "Multi-model inference ensemble: Exact Lexicon Matcher, Hybrid Char N-Gram LogReg, and PyTorch BIO Transformer",
      "Interactive clinical span annotator with real-time text highlighting and prediction visualizer",
      "Character-level Micro-F1 evaluation engine and automated model comparison benchmarking suite",
      "Extensible training harness for fine-tuning PubMedBERT and DistilBERT on specialized clinical ontologies",
      "Streamlit standalone interactive demo app alongside modern React 19 web dashboard",
    ],
    challenges: "Clinical patient notes feature complex medical abbreviations, misspellings, and discontinuous symptom mentions. Mapping exact character offsets from subword transformer tokens back to raw character slices required a custom offset indexer to prevent prediction drift.",
    cover: "/media/mednote-cover.jpg",
    gallery: [
      "/media/mednote-cover.jpg",
      "/media/projects/mednote-1.webp",
      "/media/projects/mednote-2.webp",
      "/media/projects/mednote-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/mednote-1.webp",
            "kicker": "CLINICAL SPAN ANNOTATOR",
            "title": "Exact Character Offset Extraction & Highlight Inspector",
            "description": "Interactive clinical annotation workspace displaying patient note free-text with real-time character-level offset boundaries [start, end]. Color-coded highlights isolate clinical entities (palpitations, substernal chest pressure, exertional dyspnea, family MI history) mapped directly against standardized NBME rubric concepts."
      },
      {
            "src": "/media/projects/mednote-2.webp",
            "kicker": "MULTI-MODEL INFERENCE PIPELINE",
            "title": "Ensemble Architecture: Lexicon Matcher, N-Gram & PyTorch BIO Transformer",
            "description": "End-to-end inference ensemble fusing an Exact Lexicon Matcher with strict boundary enforcement, a Character N-Gram Logistic Regression classifier for irregular typos, and a deep PyTorch BIO sequence Transformer (PubMedBERT). An arbitration decoder merges candidate probabilities into contiguous and discontinuous span offsets."
      },
      {
            "src": "/media/projects/mednote-3.webp",
            "kicker": "BENCHMARK PLATFORM",
            "title": "Kaggle Benchmark Evaluation & Validation Micro-F1 Analytics",
            "description": "Comprehensive model evaluation dashboard displaying test set character-level Micro-F1 scores (0.893 test score), precision-recall curves, and cross-entropy loss trajectories across DistilBERT, PubMedBERT, and the final ensemble checkpoint."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/MedNoteClassifier" },
      { label: "KAGGLE DATASET", meta: "NBME Score Clinical", href: "https://www.kaggle.com/c/nbme-score-clinical-patient-notes" },
    ],
    featured: true,
  },
  {
    slug: "medishot",
    title: "MediShot — Medicine Vision & Understanding",
    shortTitle: "MediShot",
    subtitle: "Uncertainty-Aware Medicine Label Parsing & OCR Pipeline",
    kind: "AI / COMPUTER VISION",
    statusBadge: "ACTIVE BUILD",
    status: "Final-Year Major Engineering Project",
    year: "2026",
    tags: ["AI/VISION", "OCR", "FASTAPI", "HEALTH-TECH"],
    filterCategories: ["AI & ML", "Backend & APIs"],
    excerpt: "An intelligent medical packaging interpretation pipeline that extracts active salts, dosage, and brand names from blurry or poorly lit photos while enforcing strict uncertainty guardrails.",
    body: [
      "Deciphering printed medicine strips and prescriptions is notoriously challenging for non-specialists, especially when packaging is crumpled, reflective, cropped, or poorly lit. MediShot tackles this critical accessibility challenge with an end-to-end OCR and entity-extraction pipeline designed specifically for pharmaceutical packaging.",
      "Users capture or upload a medicine strip. The image is processed through contrast-enhancement and binarization filters before hitting an OCR engine (Tesseract and EasyOCR). The extracted text tokens are analyzed by a domain-specific entity matcher that separates brand trade names, active chemical salts, strength measurements, and manufacturer details.",
      "Critically, MediShot implements an uncompromising safety-first rule: medical advice must never be hallucinated. If a dose is ambiguous or blurred, the system explicitly renders the field with a high-uncertainty flag rather than guessing."
    ],
    problem: "Elderly users and patients frequently struggle to read small typography, complex chemical names, and dosage instructions on pharmaceutical blister packs, leading to accidental misuse.",
    solution: "A mobile OCR app backed by a Python FastAPI engine that extracts chemical entities and displays structured summaries alongside raw text, highlighting uncertainty markers when confidence is low.",
    architecture: {
      frontend: "React Native with Expo & TypeScript (cross-platform mobile client)",
      backend: "Python, FastAPI REST endpoints, Pandas for chemical formulary normalization",
      database: "PostgreSQL medicine dictionary with active salt indices",
      services: "Tesseract OCR, EasyOCR, OpenCV image pre-processing pipelines",
    },
    keyFeatures: [
      "Low-light and skewed packaging image enhancement with OpenCV adaptive thresholding",
      "Multi-pass OCR extraction targeting blister packs, foil strips, and bottle labels",
      "Pharmaceutical entity parsing: separates brand trade names from active pharmaceutical ingredients (APIs)",
      "Confidence-weighted attribute rendering: unreadable fields are flagged rather than guessed",
      "Side-by-side verification: shows original camera crop alongside extracted text for instant user audit",
      "Offline fallback cache for commonly recognized emergency medicines",
    ],
    challenges: "Metallic blister packs cause severe specular glare, breaking conventional OCR. We implemented localized contrast-stretching filters and multi-angle token pooling to preserve legible character segments across reflections.",
    safetyNote: "MediShot is an educational aid. It does not prescribe dosage or provide clinical diagnosis. Users are prompted to verify package labels directly with certified pharmacists.",
    cover: "/media/medishot-cover.jpg",
    gallery: [
      "/media/medishot-cover.jpg",
      "/media/projects/medishot-1.webp",
      "/media/projects/medishot-2.webp",
      "/media/projects/medishot-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/medishot-1.webp",
            "kicker": "IMAGE ENHANCEMENT ENGINE",
            "title": "Computer Vision Preprocessing & Blister Pack Glare Suppression",
            "description": "Multi-stage OpenCV preprocessing pipeline designed specifically for crumpled metallic blister packs. Utilizes Contrast-Limited Adaptive Histogram Equalization (CLAHE), bilateral filtering, and adaptive Gaussian binarization to suppress specular light reflections before feeding text segments into OCR engines."
      },
      {
            "src": "/media/projects/medishot-2.webp",
            "kicker": "PHARMA ENTITY GRAPH",
            "title": "Pharmaceutical Entity Parsing & Active Salt Extraction",
            "description": "Entity extraction pipeline separating commercial brand trade names (Augmentin 625 Duo) from active pharmaceutical ingredients (Amoxicillin 500mg + Potassium Clavulanate 125mg). Cross-references extracted formulations against verified national drug compendiums and normalizes dosage units."
      },
      {
            "src": "/media/projects/medishot-3.webp",
            "kicker": "SAFETY & COMPLIANCE GUARDRAIL",
            "title": "Uncertainty-Aware Guardrails & Pharmacist Audit View",
            "description": "Zero-hallucination safety interface displaying side-by-side verification between the raw camera crop and extracted text tokens. Characters falling below the 85% confidence threshold are explicitly flagged with warning badges rather than guessed, prompting pharmacist verification."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/medishot" },
      { label: "RESEARCH LOG", meta: "Build Log", href: "#" },
    ],
    featured: true,
  },
  {
    slug: "argus",
    title: "ARGUS — Local AI Execution Gateway",
    shortTitle: "ARGUS",
    subtitle: "Security-First Policy Gateway for Windows Desktop Actions",
    kind: "SECURITY TOOL / AI GATEWAY",
    statusBadge: "PROTOTYPE",
    status: "Security Prototype & Research Architecture",
    year: "2026",
    tags: ["SECURITY", "AI AGENTS", "WEBSOCKETS", "WINDOWS API"],
    filterCategories: ["AI & ML", "Systems & Tools", "Backend & APIs"],
    excerpt: "A security-first local gateway that validates, bounds, and inspects AI agent action plans before allowing execution on a Windows desktop environment.",
    body: [
      "As autonomous AI agents gain the capability to control operating systems, run shell commands, and interact with desktop software, granting an LLM raw terminal access creates catastrophic security vulnerabilities. ARGUS solves this by placing a strict, deterministic security and authorization boundary between AI planning and desktop execution.",
      "The AI model produces structured JSON action plans rather than direct commands. ARGUS intercepts every action, runs schema validation against an allowlist, performs risk-tiered policy checks, and forces explicit user approval for high-privilege operations like file deletion or external network requests.",
      "ARGUS features full observability: token-authenticated WebSocket communication, a live terminal audit log, an emergency kill switch, and a dry-run simulation mode that predicts consequences before physical execution occurs."
    ],
    problem: "Unconstrained AI desktop agents can accidentally execute destructive commands, delete user files, or leak sensitive data when operating with raw OS privileges.",
    solution: "A local security proxy that inspects every AI plan, enforces human-in-the-loop permission gates based on operation risk, and provides an instant emergency stop button.",
    architecture: {
      frontend: "Desktop dashboard & browser extension interface with real-time telemetry",
      backend: "Python gateway with token-authenticated WebSockets and Windows API bindings",
      database: "Append-only encrypted local audit log SQLite database",
      services: "Process sandboxing, policy validator engine, dry-run action simulator",
    },
    keyFeatures: [
      "Structured action plan parser enforcing rigid JSON schema constraints",
      "Risk-based permission tiering: Read (Auto), Modify (Warn), Execute/Delete (User Prompt)",
      "Deterministic Emergency Stop kill switch that immediately halts all spawned sub-processes",
      "Token-authenticated local WebSocket channel isolating the AI agent from the OS kernel",
      "Dry-run simulation mode for testing agent plans safely without modifying disk state",
      "Tamper-evident audit trail capturing timestamps, model prompts, and execution outputs",
    ],
    challenges: "Balancing agent autonomy with strict safety. Requiring manual confirmation for every single mouse click destroys usability, so we designed a risk-scoring heuristic that auto-approves safe read operations while locking destructive write/network calls.",
    safetyNote: "ARGUS is designed to demonstrate safe agent orchestration patterns. Production deployment requires careful configuration of OS-level sandbox boundaries.",
    cover: "/media/argus-cover.jpg",
    gallery: [
      "/media/argus-cover.jpg",
      "/media/projects/argus-1.webp",
      "/media/projects/argus-2.webp",
      "/media/projects/argus-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/argus-1.webp",
            "kicker": "POLICY INTERCEPTOR",
            "title": "Structured Action Plan Interceptor & Risk Classification Engine",
            "description": "Gateway proxy validating incoming LLM agent JSON plans against strict schema allowlists. Classifies system operations into deterministic risk tiers: auto-permitting read-only commands while immediately quarantining critical filesystem deletions, shell executions, and privilege escalations."
      },
      {
            "src": "/media/projects/argus-2.webp",
            "kicker": "OBSERVABILITY CONSOLE",
            "title": "Real-Time Telemetry Stream & Desktop Action Audit Log",
            "description": "Developer observability dashboard broadcasting token-authenticated WebSocket telemetry at 0.4ms latency. Captures HMAC-SHA256 signed execution traces, child process IDs, and memory utilization in an append-only, tamper-evident local SQLite audit ledger."
      },
      {
            "src": "/media/projects/argus-3.webp",
            "kicker": "SAFETY & BLAST RADIUS",
            "title": "Dry-Run Simulation Sandbox & Emergency Kill Switch",
            "description": "Virtual overlay simulation engine predicting filesystem mutations and blast radius before physical execution occurs. Features an instant, deterministic emergency kill switch that halts all spawned child processes in under 0.1ms."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/argus" },
      { label: "SECURITY SPECS", meta: "Threat Model", href: "#" },
    ],
    featured: true,
  },
  {
    slug: "minecraft-office",
    title: "Minecraft Office — Embodied AI Workspace",
    shortTitle: "Minecraft Office",
    subtitle: "Autonomous Multi-Agent Collaborative Environment",
    kind: "AUTONOMOUS AGENTS / SIMULATION",
    statusBadge: "RESEARCH",
    status: "Experimental Embodied AI Platform",
    year: "2025",
    tags: ["AI AGENTS", "JAVA 21", "PAPERMC", "CLAUDE 3.5"],
    filterCategories: ["AI & ML", "Backend & APIs", "Systems & Tools"],
    excerpt: "An interactive virtual office built inside Minecraft where autonomous AI agents communicate, solve programming tasks, and execute external services.",
    body: [
      "Minecraft Office explores embodied multi-agent software engineering inside a 3D virtual simulation. By combining a PaperMC Minecraft server with Citizens NPC plugins, external Python services, and Claude 3.5 Sonnet, autonomous agents are given physical presence in an office environment.",
      "Each agent has defined roles (e.g. project manager, backend engineer, reviewer). They gather in virtual conference rooms, receive software tickets, discuss implementation strategies through dialogue, and trigger real-world backend scripts.",
      "The project investigates how spatial context, embodied navigation, and persistent state machines improve user intuition when observing complex multi-agent collaborative workflows."
    ],
    problem: "Monitoring multi-agent AI collaboration in terminal logs is dry and unintuitive. Visualizing interactions, bottlenecks, and state transitions in complex agent swarms needs better spatial interfaces.",
    solution: "A gamified 3D office environment inside Minecraft where agents navigate rooms, converse in proximity chats, and interact with external code repositories.",
    architecture: {
      frontend: "Minecraft Java Edition client with PaperMC custom game server hooks",
      backend: "Python / FastAPI integration service managing agent state and prompt pipelines",
      database: "PostgreSQL for persisting chat history, agent roles, and task queues",
      services: "Citizens NPC plugin, Claude 3.5 Sonnet API, Orion communication broker",
    },
    keyFeatures: [
      "PaperMC Java 21 plugin interfacing with Citizens for NPC animation and pathfinding",
      "FastAPI external orchestration bridge routing in-game events to LLM endpoints",
      "Dynamic prompt construction incorporating in-game agent positions and task status",
      "Persistent agent memory storing project discussions across game restarts",
      "Real-world webhook triggers enabling agents to deploy code or ping GitHub issues",
      "Proximity-based audio and dialogue bubbles rendered above NPC heads",
    ],
    challenges: "Bridging synchronous Minecraft game ticks (20 TPS) with asynchronous external LLM API latencies. We implemented an asynchronous event queue in Java that queues player requests without freezing the server main thread.",
    cover: "/media/minecraft_office.webp",
    gallery: [
      "/media/minecraft_office.webp",
      "/media/projects/minecraft-office-1.webp",
      "/media/projects/minecraft-office-2.webp",
      "/media/projects/minecraft-office-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/minecraft-office-1.webp",
            "kicker": "EMBODIED MULTI-AGENT SWARM",
            "title": "3D Virtual Workspace & Autonomous Collaborative NPCs",
            "description": "Simulated 3D virtual office space inside a PaperMC Minecraft server where autonomous Claude 3.5 Sonnet agents have embodied NPC avatars. Agents gather around meeting tables, assign Jira tickets, and deliberate software implementations via spatial proximity chat."
      },
      {
            "src": "/media/projects/minecraft-office-2.webp",
            "kicker": "SYSTEM ARCHITECTURE",
            "title": "PaperMC Java 21 Event Bridge & Tick-Decoupled Pipeline",
            "description": "Asynchronous threading bridge decoupling Minecraft's strict 20 TPS game loop from external LLM network latency (1-3s). Uses background worker pools and an Orion message broker so that game server ticks remain locked at 20.0 TPS with zero player lag."
      },
      {
            "src": "/media/projects/minecraft-office-3.webp",
            "kicker": "ACTION EXECUTION BRIDGE",
            "title": "In-Game CI/CD Triggers & GitHub Repository Integration",
            "description": "Real-world development integration where agent consensus in virtual conference rooms triggers external webhooks to GitHub. Agents generate code diffs, run test suites, and open verified GitHub Pull Requests autonomously."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/minecraft-office" },
      { label: "DEMO OVERVIEW", meta: "Video Demo", href: "#" },
    ],
    featured: true,
  },
  {
    slug: "service-bot",
    title: "Service Bot — High-Throughput Scraper Pipeline",
    shortTitle: "Service Bot",
    subtitle: "Production Document Retrieval & WhatsApp Delivery Pipeline",
    kind: "AUTOMATION & BACKEND PIPELINE",
    statusBadge: "PRODUCTION",
    status: "Internship Project (Pureframe Labs)",
    year: "2026",
    tags: ["AUTOMATION", "PLAYWRIGHT", "RABBITMQ", "POSTGRESQL"],
    filterCategories: ["Automation", "Backend & APIs"],
    excerpt: "Automated paid land-record document extraction handling 25,000+ government records with Playwright workers, RabbitMQ queues, and WhatsApp delivery.",
    body: [
      "Developed during my Software Developer Internship at Pureframe Labs (May 2026 – June 2026), Service Bot was built to automate a complex, manual document-retrieval workflow for official land and property records.",
      "When a user requests a record and completes payment, an asynchronous job is dispatched to a RabbitMQ message queue. Headless Playwright workers pick up the job, navigate intricate legacy state government portals with dynamic form states, extract the corresponding PDF document, and store the file in persistent storage.",
      "The processed document is then delivered directly to the citizen via WhatsApp webhooks, and an administrative telemetry dashboard provides real-time monitoring of worker queues, retries, and error rates."
    ],
    problem: "Citizens endured hours of manual searching on unstable government websites to download property land records. A batch run of 5,000 records previously took over 8 hours and failed frequently with HTTP 503 errors.",
    solution: "A distributed worker pipeline using RabbitMQ, Playwright headless browsers, exponential backoff, and idempotent queue consumers that reduced retrieval failures to near zero.",
    architecture: {
      frontend: "Admin monitoring dashboard built with TypeScript and Hono / Bun",
      backend: "Python automation engine, RabbitMQ message brokers, Playwright workers",
      database: "PostgreSQL tracking job states, payment confirmations, and document hashes",
      services: "WhatsApp Business API webhook delivery, RabbitMQ dead-letter queues",
    },
    keyFeatures: [
      "Large-scale scraper targeting 20,000–25,000 government land registry records",
      "RabbitMQ task distribution ensuring web requests never block on long-running scrapes",
      "Exponential backoff and jitter algorithms mitigating external portal HTTP 503 and 500 errors",
      "Idempotent task processing ensuring duplicate messages never trigger duplicate payments or downloads",
      "Automated PDF document integrity validation and text indexing",
      "Instant WhatsApp document delivery webhook with user delivery confirmation tracking",
    ],
    challenges: "The target government portal frequently dropped connections and returned HTTP 503 errors during heavy traffic. I redesigned the scraping architecture from synchronous execution to an event-driven queue with dead-letter exchanges and rate-limiting delays.",
    safetyNote: "Engineered under corporate internship guidelines at Pureframe Labs Pvt. Ltd. Code references respect confidential company parameters and compliance rules.",
    cover: "/media/servicebot-cover.jpg",
    gallery: [
      "/media/servicebot-cover.jpg",
      "/media/projects/servicebot-1.webp",
      "/media/projects/servicebot-2.webp",
      "/media/projects/servicebot-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/servicebot-1.webp",
            "kicker": "AUTOMATION ENGINE",
            "title": "Distributed RabbitMQ Queue & Worker Architecture",
            "description": "Scalable worker architecture utilizing RabbitMQ message brokers, durable task exchanges, and dead-letter queues. Batches incoming requests across a pool of 16 concurrent headless Playwright instances with idempotent processing guarantees."
      },
      {
            "src": "/media/projects/servicebot-2.webp",
            "kicker": "SCRAPER PIPELINE",
            "title": "Headless Playwright Automation & PDF Extraction",
            "description": "Multi-stage headless crawler navigating legacy state government land record portals. Automatically cascades dynamic dropdown selects, resolves verification captchas in 42ms, bypasses transient HTTP 503 errors with exponential backoff, and validates PDF checksums."
      },
      {
            "src": "/media/projects/servicebot-3.webp",
            "kicker": "PRODUCTION METRICS",
            "title": "Production Operations Dashboard & WhatsApp Webhook Delivery",
            "description": "Telemetry dashboard tracking 25,480 official land records processed during the Pureframe Labs internship with a 99.82% retrieval success rate. Completed documents are dispatched automatically to citizens via WhatsApp Business API webhooks within seconds."
      }
],
    links: [
      { label: "INTERNSHIP SUMMARY", meta: "Pureframe Labs", href: "https://www.linkedin.com/in/pathak-ji-op/" },
    ],
    featured: true,
  },
  {
    slug: "pkgman",
    title: "pkgman — Rust TUI Package Manager",
    shortTitle: "pkgman",
    subtitle: "High-Performance Terminal UI for Arch Linux & AUR",
    kind: "SYSTEMS PROGRAMMING / TUI",
    statusBadge: "ACTIVE BUILD",
    status: "Open Source Systems Project",
    year: "2025",
    tags: ["RUST", "RATATUI", "SYSTEMS", "ARCH LINUX"],
    filterCategories: ["Systems & Tools"],
    excerpt: "A blazing-fast terminal user interface for package management on Arch Linux, featuring interactive pactree dependency graphs and async background querying.",
    body: [
      "pkgman was born out of a desire for a unified, keyboard-driven interface to explore, inspect, and manage packages across both official Arch Linux repositories and the Arch User Repository (AUR).",
      "Built with Rust and the Ratatui terminal UI framework, pkgman provides instant fuzzy searching, package metadata inspection, and a visual tree hierarchy of package dependencies inspired by pactree.",
      "The application leverages asynchronous Rust (Tokio) to ensure search queries and dependency tree generation never block the terminal rendering loop, allowing 60 FPS scrolling and responsive keystroke handling even when querying remote mirrors."
    ],
    problem: "Standard command-line package tools (pacman, yay, pactree) require remembering dozens of flags and lack an interactive exploratory interface for inspecting package trees and changelogs.",
    solution: "A single lightweight, zero-dependency Rust binary providing a keyboard-centric TUI with instant fuzzy search, dependency visualization, and customizable color themes.",
    architecture: {
      frontend: "Terminal User Interface (TUI) rendered using Ratatui and Crossterm",
      backend: "Rust 2021 edition with Tokio async runtime for non-blocking I/O",
      database: "Local ALPM (Arch Linux Package Management) sync database cache",
      services: "AUR RPC JSON API integration, TOML configuration engine",
    },
    keyFeatures: [
      "High-speed fuzzy search across local installed packages, sync databases, and AUR",
      "Interactive dependency tree visualization showing upstream and downstream dependencies",
      "Fully asynchronous UI updates: remote network lookups run in background threads",
      "Customizable theme support via clean TOML configuration files",
      "Strict separation between read-only inspection and elevated root installation actions",
      "Zero-latency keyboard shortcuts with vim-style navigation keys (hjkl)",
    ],
    challenges: "Parsing and rendering recursive dependency graphs without cycles or stack overflows required implementing a directed acyclic graph (DAG) visitor with cycle detection in Rust.",
    cover: "/media/pkgman-cover.jpg",
    gallery: [
      "/media/pkgman-cover.jpg",
      "/media/projects/pkgman-1.webp",
      "/media/projects/pkgman-2.webp",
      "/media/projects/pkgman-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/pkgman-1.webp",
            "kicker": "TERMINAL USER INTERFACE",
            "title": "Ratatui Terminal UI & Blazing-Fast Fuzzy Search",
            "description": "Keyboard-driven terminal interface engineered with Rust and Ratatui. Features instantaneous fuzzy searching across 14,000+ local and sync packages in 4.2ms, split-screen metadata inspection, and vim-style navigation keybindings."
      },
      {
            "src": "/media/projects/pkgman-2.webp",
            "kicker": "DEPENDENCY RESOLUTION",
            "title": "Interactive Pactree Dependency DAG Graph Visualizer",
            "description": "Visual dependency tree explorer rendering hierarchical upstream and downstream package relationships with cycle detection in Rust. Traverses direct dependencies, optional flags, and transitive library constraints in under 2ms."
      },
      {
            "src": "/media/projects/pkgman-3.webp",
            "kicker": "SYSTEMS ARCHITECTURE",
            "title": "Asynchronous Tokio Runtime & AUR RPC API Bridge",
            "description": "Multi-threaded systems architecture isolating terminal 60 FPS crossterm rendering from background network threads querying the Arch User Repository (AUR) RPC API and reading local memory-mapped ALPM sync databases."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/pkgman" },
      { label: "CRATES / CODE", meta: "Source Code", href: "#" },
    ],
    featured: true,
  },
  {
    slug: "noir-chat",
    title: "Noir Chat — Ephemeral Private Messaging",
    shortTitle: "Noir Chat",
    subtitle: "Cyber-Noir Ephemeral Chat with Self-Destruct Timers",
    kind: "WEB APPLICATION / REAL-TIME",
    statusBadge: "PROTOTYPE",
    status: "Privacy-Focused Web App",
    year: "2025",
    tags: ["FULL-STACK", "REACT", "SUPABASE", "WEBSOCKETS"],
    filterCategories: ["Full-Stack", "Backend & APIs"],
    excerpt: "A minimalist temporary chat application for direct and group conversations with configurable message self-destruct timers and zero server retention.",
    body: [
      "Noir Chat provides a distraction-free, temporary messaging environment designed for high-sensitivity discussions that need to disappear without leaving persistent digital footprints.",
      "Built with a sleek cyber-noir aesthetic, the application supports instant disposable chat rooms, password-protected group invites, and strict time-to-live (TTL) timers on messages.",
      "Messages are stored temporarily in Supabase with database-level cron triggers that automatically purge expired records, ensuring that deleted conversations cannot be recovered from server storage."
    ],
    problem: "Mainstream messaging platforms default to indefinite cloud storage, syncing years of casual chatter across servers and making private conversations permanent.",
    solution: "A disposable, low-friction chat platform where rooms exist for designated time windows and messages self-destruct after read or timer expiration.",
    architecture: {
      frontend: "React, Tailwind CSS, Framer Motion with custom cyber-noir styling",
      backend: "Node.js / Express with WebSocket channels for instant message delivery",
      database: "Supabase / PostgreSQL with automatic TTL trigger deletions",
      services: "Vercel edge deployment, server-side room token validation",
    },
    keyFeatures: [
      "Instant disposable room generation with one-click shareable secret links",
      "Per-message self-destruct countdown timers (10s, 1m, 1h, 24h)",
      "Server-side automated database cleanup enforcing guaranteed message deletion",
      "Clean, minimalist dark-mode user experience with sound cues and typing indicators",
      "Support for direct 1-on-1 chats and small private group discussions",
    ],
    challenges: "Ensuring server-side message purge accuracy regardless of whether client browsers remain connected or disconnect unexpectedly. We shifted timer enforcement to PostgreSQL database triggers rather than relying on client timers.",
    cover: "/media/noir-cover.jpg",
    gallery: [
      "/media/noir-cover.jpg",
      "/media/projects/noir-1.webp",
      "/media/projects/noir-2.webp",
      "/media/projects/noir-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/noir-1.webp",
            "kicker": "PRIVATE MESSAGING UI",
            "title": "Cyber-Noir Ephemeral Messaging & Disposable Rooms",
            "description": "Minimalist temporary messaging interface designed for sensitive discussions. Supports instant secret room creation with shareable disposable tokens, sender anonymity, and countdown timers rendered directly on each chat bubble."
      },
      {
            "src": "/media/projects/noir-2.webp",
            "kicker": "EPHEMERAL PROTOCOL",
            "title": "Self-Destruct Timer Matrix & Granular Retention Controls",
            "description": "Configurable Time-to-Live (TTL) intervals ranging from 10 seconds (instant burn) up to 24 hours. Messages self-destruct upon reading with client-side particle dissolution cues and guaranteed server memory pruning."
      },
      {
            "src": "/media/projects/noir-3.webp",
            "kicker": "DATABASE ARCHITECTURE",
            "title": "Zero-Retention Supabase PostgreSQL Database Purge Engine",
            "description": "Database-level retention guarantee using PostgreSQL pg_cron triggers executing automatic hard row deletions where expires_at <= NOW(). Ensures zero data residue survives server restarts or client disconnections."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/noir-chat" },
      { label: "LIVE DEMO", meta: "Test App", href: "#" },
    ],
    featured: false,
  },
  {
    slug: "artistly",
    title: "Artistly — Performing Artist Marketplace",
    shortTitle: "Artistly",
    subtitle: "Talent Discovery & Booking Platform for Indian Artists",
    kind: "FULL-STACK PLATFORM",
    statusBadge: "PROTOTYPE",
    status: "Full-Stack Web Platform",
    year: "2025",
    tags: ["FULL-STACK", "NEXT.JS", "POSTGRESQL", "RBAC"],
    filterCategories: ["Full-Stack", "Backend & APIs"],
    excerpt: "A full-stack booking platform connecting event organizers with performing artists across India, featuring customized quotations, schedule calendars, and RBAC.",
    body: [
      "Artistly was conceived to address the opaque and fragmented talent booking market in India. Event planners often struggle to find verified performing artists (singers, dancers, comedians, musicians) and negotiate clear quotations without middlemen markups.",
      "The platform provides comprehensive artist profiles showcasing past performances, verified reviews, genre tags, and available calendar slots. Event planners can submit enquiry forms specifying event parameters and receive custom quotes directly from artists.",
      "The system is built on Next.js, TypeScript, and PostgreSQL with robust Role-Based Access Control (RBAC) separating artist portals, client planners, and platform administrators."
    ],
    problem: "Booking performing artists in India is plagued by opaque pricing, lack of centralized portfolios, and unorganized manual phone negotiations.",
    solution: "A centralized platform featuring rich artist profiles, structured enquiry forms, quotation generation, and calendar booking workflows.",
    architecture: {
      frontend: "Next.js (App Router), React, TypeScript, Tailwind CSS",
      backend: "Spring Boot / Node.js REST API with JWT role-based access control",
      database: "PostgreSQL schema modeling artists, categories, bookings, and reviews",
      services: "Media upload pipelines, email notification services",
    },
    keyFeatures: [
      "Comprehensive artist portfolios featuring media galleries, genre tags, and reviews",
      "Dynamic quotation engine allowing artists to price based on event duration and requirements",
      "Real-time booking inquiry status tracking (Requested, Quoted, Confirmed, Completed)",
      "Role-Based Access Control (RBAC) for artists, event organizers, and platform admins",
      "Location and genre-based filtering covering major Indian metropolitan cities",
    ],
    challenges: "Modeling complex booking workflows where quotation negotiation involves multi-round adjustments before contract confirmation. We implemented a state machine in PostgreSQL with distinct transaction states.",
    cover: "/media/artistly-cover.jpg",
    gallery: [
      "/media/artistly-cover.jpg",
      "/media/projects/artistly-1.webp",
      "/media/projects/artistly-2.webp",
      "/media/projects/artistly-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/artistly-1.webp",
            "kicker": "MARKETPLACE DISCOVERY",
            "title": "Talent Discovery Marketplace & Performing Artist Profiles",
            "description": "Curated talent discovery platform connecting Indian performing artists (musicians, comedians, dancers) with event organizers. Features rich portfolio showcases, verified client reviews, audio/video reel integration, and multi-city filters."
      },
      {
            "src": "/media/projects/artistly-2.webp",
            "kicker": "TRANSACTION STATE MACHINE",
            "title": "Dynamic Multi-Stage Quotation & Booking State Machine",
            "description": "End-to-end booking state machine tracking inquiries through quotation negotiation, equipment rider adjustments, milestone escrow payments, and final contract completion."
      },
      {
            "src": "/media/projects/artistly-3.webp",
            "kicker": "ACCESS CONTROL ARCHITECTURE",
            "title": "Role-Based Access Control (RBAC) Management Console",
            "description": "Segmented portal architecture with JWT role authorization separating Artist management views (gig calendar, quote builder), Client organizer workflows (quote comparisons, messaging), and Admin platform oversight."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/artistly" },
      { label: "LIVE DEMO", meta: "Platform Preview", href: "#" },
    ],
    featured: false,
  },
  {
    slug: "ayurvedic-info",
    title: "Ayurvedic Information System",
    shortTitle: "Ayurvedic System",
    subtitle: "Google Solution Challenge Botanical Knowledge Repository",
    kind: "HEALTH INFORMATICS / COMMUNITY",
    statusBadge: "CHALLENGE",
    status: "Google Solution Challenge Project (Team Lead)",
    year: "2025",
    tags: ["REACT", "PYTHON", "HEALTH-TECH", "LEADERSHIP"],
    filterCategories: ["Full-Stack", "AI & ML"],
    excerpt: "A digital information system making traditional Ayurvedic medicinal herbs and formulations accessible with modern data exploration and sourced claims.",
    body: [
      "Built as part of the Google Solution Challenge where I served as Team Leader, this project aimed to preserve and modernize access to traditional Ayurvedic herbal wisdom through structured digital information architecture.",
      "Traditional formulations often exist in inaccessible texts with scattered nomenclature. Our team compiled a structured digital database linking common herbs (Ashwagandha, Tulsi, Amla, Turmeric) with botanical names, active chemical compounds, traditional indications, and modern scientific findings.",
      "Beyond code, as team lead I coordinated sprint meetings, guided junior peers in developer workshops, and ensured our interface strictly distinguished educational wellness information from certified medical diagnoses."
    ],
    problem: "Traditional Ayurvedic botanical knowledge is scattered, filled with conflicting colloquial names, and difficult for modern students and researchers to navigate systematically.",
    solution: "A searchable, structured digital encyclopedia presenting botanical attributes, active chemical compounds, and treatment categories with transparent sourcing.",
    architecture: {
      frontend: "React with modular component architecture and responsive design",
      backend: "Python data processing and RESTful API endpoints",
      database: "Structured JSON and relational database containing botanical entities",
      services: "Search indexing and categorization engine",
    },
    keyFeatures: [
      "Searchable botanical index mapping common names to binomial nomenclature",
      "Active chemical compound breakdowns and traditional therapeutic properties",
      "Categorized exploration by wellness categories (Immunity, Digestion, Respiratory)",
      "Transparent source citations distinguishing historical claims from clinical studies",
      "Led student team in UI design, data validation, and presentation deliverables",
    ],
    challenges: "Consolidating divergent herbal nomenclature across multiple Indian regional languages into standardized botanical entries with clear source verification.",
    cover: "/media/ayurvedic-cover.jpg",
    gallery: [
      "/media/ayurvedic-cover.jpg",
      "/media/projects/ayurvedic-1.webp",
      "/media/projects/ayurvedic-2.webp",
      "/media/projects/ayurvedic-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/ayurvedic-1.webp",
            "kicker": "BOTANICAL KNOWLEDGE BASE",
            "title": "Botanical Encyclopedia & Medicinal Plant Repository",
            "description": "Digital botanical repository developed for the Google Solution Challenge. Organizes traditional Ayurvedic medicinal herbs with standard botanical binomial taxonomy, Sanskrit vernacular terms, and multi-lingual search."
      },
      {
            "src": "/media/projects/ayurvedic-2.webp",
            "kicker": "PHARMACOGNOSY ENGINE",
            "title": "Phytochemical Profiling & Modern Pharmacological Matrix",
            "description": "Detailed phytochemical constituent breakdown mapping classical Ayurvedic properties (Rasa, Guna, Virya, Vipaka) directly to modern bioactives (Withanolides, Eugenol, Curcumin) and their physiological mechanisms."
      },
      {
            "src": "/media/projects/ayurvedic-3.webp",
            "kicker": "EVIDENCE VERIFICATION",
            "title": "Therapeutic Wellness Explorer & Sourced Claim Verification",
            "description": "Transparent wellness categorization engine linking traditional indications with peer-reviewed clinical studies. Distinguishes classical manuscript claims from randomized controlled trial evidence."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/ayurvedic-system" },
    ],
    featured: false,
  },
  {
    slug: "prompt-ai",
    title: "Prompt Generator AI — Local LLM Prompt Synthesis",
    shortTitle: "Prompt AI",
    subtitle: "Structured System Prompt Builder Powered by Local Mistral 7B",
    kind: "LOCAL AI / FULL-STACK PROMPT ENGINE",
    statusBadge: "PROTOTYPE",
    status: "Full-Stack AI Project & Local Inference Gateway",
    year: "2025",
    tags: ["OLLAMA", "MISTRAL 7B", "EXPRESS", "REACT", "NODE.JS"],
    filterCategories: ["AI & ML", "Full-Stack", "Backend & APIs"],
    excerpt: "A full-stack prompt engineering and generation studio pairing a React input interface with an Express backend connected to a local Ollama Mistral 7B engine for cost-free, private prompt synthesis.",
    body: [
      "Prompt Generator AI is a full-stack developer utility designed to streamline prompt engineering workflows. Rather than manually typing loose, unstructured queries into chat interfaces, users decompose prompt requirements into foundational prompt-engineering dimensions: Role, Context, Action, and Specific Instructions.",
      "The React client captures structured input parameters and dispatches them to a modular Express.js backend. The API handles schema validation and routes prompt generation requests to a locally hosted Ollama runtime executing the Mistral 7B large language model.",
      "By running Mistral 7B locally on device via Ollama, the application delivers instant, zero-cost prompt synthesis without transmitting sensitive proprietary instructions or user data to external cloud APIs.",
    ],
    problem: "Crafting high-quality system prompts for LLMs requires clear role boundaries, contextual constraints, and explicit instructions. Non-technical users often produce vague prompts with inconsistent AI outputs. Additionally, iterating on prompts through commercial cloud APIs incurs recurring token fees and risks exposing confidential instructions.",
    solution: "An end-to-end web studio pairing an intuitive React input layout with an Express MVC backend that orchestrates prompt synthesis using a local Ollama Mistral 7B instance, guaranteeing data privacy and zero API expenses.",
    architecture: {
      frontend: "React.js with component-driven state architecture (promptgenerator.js) capturing Role, Context, Action, and Instructions",
      backend: "Node.js & Express.js REST API with MVC pattern separation across routes, controllers, and models",
      database: "Local in-memory schema and prompt data model (promptModel.js) for serialization and synthesis history",
      services: "Local Ollama execution gateway serving quantized Mistral 7B parameter weights via local HTTP endpoints",
    },
    keyFeatures: [
      "Structured prompt engineering interface decomposing tasks into Role, Context, Action, and Constraints",
      "Local LLM orchestration powered by Ollama Mistral 7B for cost-free, private local inference",
      "Decoupled Express.js architecture with dedicated routes, controllers, and prompt models",
      "Real-time prompt rendering and one-click copyable system prompt output",
      "Zero third-party cloud API dependencies, ensuring confidential instructions remain on-premise",
      "Extensible controller pipeline capable of targeting alternative local models (Llama 3, Phi-3, Gemma)",
    ],
    challenges: "Integrating with local Ollama daemon endpoints while managing inference latency on consumer hardware. We implemented structured input sanitization and prompt template wrapping to ensure Mistral 7B consistently returns concise, ready-to-use prompt definitions.",
    cover: "/media/prompt-ai-cover.jpg",
    gallery: [
      "/media/prompt-ai-cover.jpg",
      "/media/projects/prompt-ai-1.webp",
      "/media/projects/prompt-ai-2.webp",
      "/media/projects/prompt-ai-3.webp"
],
    showcase: [
      {
            "src": "/media/projects/prompt-ai-1.webp",
            "kicker": "PROMPT ENGINEERING STUDIO",
            "title": "Structured System Prompt Decomposition Studio",
            "description": "Interactive React prompt engineering studio breaking down complex instructions into foundational dimensions: Persona Role, Domain Context, Core Action Directives, and Output Constraints with real-time token count previews."
      },
      {
            "src": "/media/projects/prompt-ai-2.webp",
            "kicker": "INFERENCE PIPELINE",
            "title": "Local Ollama & Mistral 7B Private Inference Gateway",
            "description": "Full-stack inference architecture routing requests from an Express.js MVC backend to a locally hosted Ollama runtime executing quantized Mistral 7B weights, achieving zero API token cost and complete data privacy."
      },
      {
            "src": "/media/projects/prompt-ai-3.webp",
            "kicker": "BENCHMARKING & EXPORT",
            "title": "Prompt Evaluation, Token Efficiency & Export Studio",
            "description": "Comprehensive developer studio analyzing prompt token efficiency, latency metrics, and formatting compatibility across Mistral 7B, Llama 3, and Claude models with instant JSON and clipboard export."
      }
],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/Prompt-AI" },
    ],
    featured: false,
  },
];

// Additional lab experiments and utilities from project.md
export type UtilityProject = {
  id: string;
  name: string;
  desc: string;
  tech: string[];
  status: string;
  link?: string;
};

export const utilityProjects: UtilityProject[] = [
  {
    id: "prompt-gen",
    name: "Prompt Generator AI",
    desc: "A full-stack application that structures, refines, and synthesizes high-efficiency system prompts using local Ollama Mistral 7B.",
    tech: ["React", "Node.js", "Express", "Ollama", "Mistral 7B"],
    status: "Prototype",
    link: "https://github.com/pathakjiop/Prompt-AI",
  },
  {
    id: "leetcode-ext",
    name: "LeetCode Chrome Extension",
    desc: "Browser extension optimizing algorithmic problem-solving workflows and reading session history.",
    tech: ["JavaScript", "Chrome Extensions API"],
    status: "Utility Tool",
    link: "https://github.com/pathakjiop/",
  },
  {
    id: "healthy-life",
    name: "Healthy Lifestyle Assistant",
    desc: "AI lifestyle and fitness recommendation assistant utilizing Google Gemini API with conversational suggestions.",
    tech: ["Python", "Gemini API"],
    status: "AI Experiment",
    link: "https://github.com/pathakjiop/",
  },
  {
    id: "cloth-shop",
    name: "Cloth Shop Management",
    desc: "Desktop operations application for garment retail inventory, customer records, and daily transaction tracking.",
    tech: ["Python", "Tkinter", "MySQL"],
    status: "Completed Desktop App",
    link: "https://github.com/pathakjiop/",
  },
  {
    id: "geo-attendance",
    name: "Geolocation Attendance",
    desc: "Mobile attendance tracking system with GPS coordinate verification and location boundary checking.",
    tech: ["Ionic", "Capacitor", "JavaScript"],
    status: "Mobile Prototype",
    link: "https://github.com/pathakjiop/",
  },
  {
    id: "password-manager",
    name: "Password Manager",
    desc: "Local credential management application with encryption design, master secret protection, and zero plaintext logs.",
    tech: ["React", "Python", "Cryptography"],
    status: "Security Prototype",
    link: "https://github.com/pathakjiop/",
  },
];

export const selectedSlugs = [
  "mednoteclassifier",
  "medishot",
  "argus",
  "minecraft-office",
  "service-bot",
  "pkgman",
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function getNextWork(slug: string) {
  const idx = works.findIndex((w) => w.slug === slug);
  if (idx === -1) return works[0];
  return works[(idx + 1) % works.length];
}

export function getPrevWork(slug: string) {
  const idx = works.findIndex((w) => w.slug === slug);
  if (idx === -1) return works[works.length - 1];
  return works[(idx - 1 + works.length) % works.length];
}

export const heroFrames = [
  "/media/hero.webp",
  "/media/still-08.webp",
  "/media/still-40.webp",
  "/media/shibuya.png",
];
