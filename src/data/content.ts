export type WorkLink = { label: string; meta: string; href: string };

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
    slug: "uai",
    title: "UAI — Unified Authentication Interface",
    shortTitle: "UAI",
    subtitle: "UPI-Inspired Identity & Selective Disclosure Auth Protocol",
    kind: "IDENTITY PROTOCOL / FULL-STACK",
    statusBadge: "ACTIVE BUILD",
    status: "Flagship Prototype & Identity Architecture",
    year: "2026",
    tags: ["IDENTITY", "OIDC/JWT", "FASTAPI", "REACT NATIVE"],
    filterCategories: ["Full-Stack", "Backend & APIs", "Systems & Tools"],
    excerpt: "A unified authentication protocol inspired by UPI, enabling citizen identity wallets to authenticate with service providers via QR codes with strict selective disclosure.",
    body: [
      "UAI (Unified Authentication Interface) reimagines digital identity and authentication with the sheer elegance and ubiquity of India's UPI payments system. Instead of sharing unvetted physical identity documents or logging in with opaque third-party trackers, a user owns a unique UAI ID (e.g. username@uai.in) linked to a cryptographically verifiable wallet.",
      "The system cleanly bifurcates into two distinct surfaces: the citizen-facing mobile identity wallet (for credential storage, consent review, and QR scanning) and the service-provider management portal (for registering business endpoints, issuing permanent counter QRs, and auditing access event streams).",
      "When a citizen interacts with a merchant or service provider, the provider presents a dynamic or permanent QR code. The citizen reviews the specific data attributes requested (e.g. age verification vs. full birthdate) and grants granular consent. The server verifies the signature and registers an audit log without storing unnecessary citizen attributes."
    ],
    problem: "Citizens constantly hand over unredacted physical identity documents (Aadhaar, licenses, IDs) for trivial checks (age verification, building entry), causing massive data leakage and identity theft. Current digital auth systems are fragmented and lack minimal-disclosure guarantees.",
    solution: "A two-tier identity framework providing UPI-like convenience: permanent/dynamic QR codes, verifiable credentials, biometric wallet authorization, and an API-backed selective disclosure engine.",
    architecture: {
      frontend: "React (Provider Portal) & React Native / Expo (Citizen Identity Wallet) with TypeScript",
      backend: "Python / FastAPI with JWT, OAuth 2.0 / OpenID Connect (OIDC) core services",
      database: "PostgreSQL with audit trails and cryptographically hashed access logs",
      services: "Verifiable Credential (VC) and DID protocols, ESP32 counter display integration",
    },
    keyFeatures: [
      "Unique UAI ID generation and real-time namespace availability resolution",
      "QR-based authentication separating permanent merchant QRs from ephemeral challenge tokens",
      "Selective disclosure: disclose 'Age ≥ 21' without revealing birthdate or residential address",
      "Hardware-backed mobile wallet with biometric unlock (Face ID / Fingerprint)",
      "Service provider registration portal with access logs and printable merchant QR generators",
      "Architectural foundation for DigiLocker credential validation integration",
    ],
    challenges: "The key challenge was distinguishing between offline QR presentation and authoritative online verification. A static QR can initiate a workflow, but cannot cryptographically prove credential validity without a network-backed challenge-response handshake.",
    safetyNote: "UAI explores verifiable credentials and minimal disclosure. It represents an engineering design and prototype; legal or governmental identity recognition is subject to regulatory compliance.",
    cover: "/media/uai-cover.jpg",
    gallery: ["/media/uai-cover.jpg"],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/uai" },
      { label: "ARCHITECTURE DOCS", meta: "Specification", href: "#" },
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
    gallery: ["/media/medishot-cover.jpg"],
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
    gallery: ["/media/argus-cover.jpg"],
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
    cover: "/media/minecraft_office.png",
    gallery: ["/media/minecraft_office.png"],
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
    gallery: ["/media/servicebot-cover.jpg"],
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
    gallery: ["/media/pkgman-cover.jpg"],
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
    gallery: ["/media/noir-cover.jpg"],
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
    gallery: ["/media/artistly-cover.jpg"],
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
    gallery: ["/media/ayurvedic-cover.jpg"],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/ayurvedic-system" },
    ],
    featured: false,
  },
  {
    slug: "esp32-display",
    title: "UAI QR / ESP32 Hardware Prototype",
    shortTitle: "ESP32 Display",
    subtitle: "Embedded Hardware Prototype for Counter Auth QRs",
    kind: "EMBEDDED HARDWARE / IOT",
    statusBadge: "PROTOTYPE",
    status: "Hardware Experiment & Prototype",
    year: "2026",
    tags: ["C++", "ESP32", "ARDUINO", "OLED"],
    filterCategories: ["Systems & Tools"],
    excerpt: "An embedded hardware prototype using ESP32, SSD1306 OLED, and sensors to render dynamic provider QR codes for physical merchant checkout counters.",
    body: [
      "To bridge UAI's digital authentication protocol with physical, real-world counters (hotel check-in desks, hospital registration counters, bank branches), this hardware prototype explores dedicated, low-cost hardware QR displays.",
      "Built on the ESP32 microcontroller with an SSD1306 OLED display, the firmware handles serial initialization, dynamic QR bitmap rendering, and environment telemetry (DHT11 temperature/humidity sensing for counter health).",
      "This experiment clarifies a crucial engineering principle: while an ESP32 can display a counter QR code, actual identity verification and audit trails remain the sole domain of the secure UAI backend network flow."
    ],
    problem: "Paper QR codes at physical merchant counters are prone to physical tampering or replacement, and cannot refresh authentication challenge tokens dynamically.",
    solution: "An ESP32-powered micro-device that dynamically renders fresh challenge QR codes and displays real-time connection status.",
    architecture: {
      frontend: "SSD1306 0.96-inch OLED I2C monochrome display",
      backend: "Embedded C/C++ firmware compiled with Arduino ESP32 core",
      database: "Non-volatile SPIFFS storage on ESP32 flash",
      services: "Serial monitor telemetry, WiFi station connectivity",
    },
    keyFeatures: [
      "Dynamic bitmap rendering of QR codes on SSD1306 OLED display via I2C",
      "ESP32 WiFi station connectivity for polling merchant session tokens",
      "Serial debugging and fail-safe boot recovery routines",
      "Integrated DHT11 environmental sensor for device health monitoring",
      "Modular firmware architecture with explicit separation of setup and loop states",
    ],
    challenges: "Memory-constrained QR rendering on the SSD1306 buffer while maintaining responsive I2C communication and Wi-Fi handshakes without watchdog timer resets.",
    cover: "/media/sit.png",
    gallery: ["/media/sit.png"],
    links: [
      { label: "GITHUB REPO", meta: "View Repository", href: "https://github.com/pathakjiop/esp32-display" },
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
    desc: "A web application that structures, refines, and formats high-efficiency system prompts for LLMs.",
    tech: ["React", "Node.js", "Express"],
    status: "Prototype",
    link: "https://github.com/pathakjiop/",
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
  "uai",
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
