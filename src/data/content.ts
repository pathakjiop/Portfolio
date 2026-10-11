import { media } from './media';
export type WorkLink = { label: string; meta: string; href: string };

export type Work = {
  slug: string;
  title: string;
  kind: string;
  tags: string[];
  excerpt: string;
  body: string[];
  note?: string;
  cover: string;
  gallery: string[];
  links: WorkLink[];
  youtubeId?: string;
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
      "Python Backend",
      "React / Next.js",
      "REST APIs",
      "Database Design",
      "Auth Systems",
    ],
  },
  {
    n: "02",
    title: "Automation & Data",
    items: [
      "Web Scraping",
      "Playwright",
      "RabbitMQ",
      "Workflow Automation",
    ],
  },
  {
    n: "03",
    title: "AI & Machine Learning",
    items: [
      "Model Evaluation",
      "LLM Integration",
      "Data Processing",
      "Predictive Modeling",
    ],
  },
];

export const toolkit = [
  {
    n: "01",
    title: "languages",
    items: [
      "python",
      "javascript",
      "c++",
      "java",
      "sql",
      "rust",
    ],
  },
  {
    n: "02",
    title: "frontend & backend",
    items: [
      "react.js",
      "next.js",
      "tailwind css",
      "django",
      "hono",
      "postgresql",
      "supabase",
    ],
  },
  {
    n: "03",
    title: "tools & ai",
    items: [
      "playwright",
      "rabbitmq",
      "docker",
      "scikit-learn",
      "pandas",
      "ollama",
    ],
  },
];

export const experience = [
  {
    when: "May 2026 — June 2026",
    role: "Software Developer Intern",
    company: "Pureframe Labs Pvt. Ltd.",
    rest: " · Internship",
  },
  {
    when: "Present",
    role: "Team Leader",
    company: "Google Solution Challenge",
    rest: " · Project",
  },
  {
    when: "Present",
    role: "Java Module Mentor",
    company: "FabLab",
    rest: " · Mentorship",
  },
];

export const filters = [
  "All",
  "Full-Stack",
  "Backend",
  "Frontend",
  "Automation",
  "Machine Learning",
  "AI",
];

export const works: Work[] = [
  {
    slug: "argus",
    title: "ARGUS",
    kind: "SECURITY TOOL",
    tags: ["AI GATEWAY", "WINDOWS"],
    excerpt: "A security-first local gateway that lets AI assistants run controlled actions on a Windows desktop.",
    body: [
      "A security-first local gateway that lets AI assistants run controlled actions on a Windows desktop.",
    ],
    cover: "/media/mockup-1600x1131-1.png",
    gallery: [],
    links: [{ label: "GITHUB REPO", meta: "View Project", href: "https://github.com/pathakjiop/argus" }],
    featured: true,
  },
  {
    slug: "artistly",
    title: "Artistly",
    kind: "FULL-STACK WEB APP",
    tags: ["BOOKING PLATFORM", "FULL-STACK"],
    excerpt: "A performing artist booking platform connecting event planners with artists across India.",
    body: [
      "A performing artist booking platform connecting event planners with artists across India.",
    ],
    cover: "/media/laptop2.png",
    gallery: [],
    links: [{ label: "LIVE DEMO", meta: "View Project", href: "#" }],
    featured: true,
  },
  {
    slug: "medishot",
    title: "MediShot",
    kind: "AI APP",
    tags: ["OCR", "AI/ML"],
    excerpt: "An app that identifies medicines from photos using OCR.",
    body: [
      "An app that identifies medicines from photos using OCR.",
    ],
    cover: "/media/mainscreen-1440x760-1.png",
    gallery: [],
    links: [{ label: "GITHUB REPO", meta: "View Project", href: "#" }],
    featured: true,
  },
  {
    slug: "minecraft-office",
    title: "Minecraft Office",
    kind: "AI AGENTS",
    tags: ["MULTI-AGENT", "AUTOMATION"],
    excerpt: "A collaborative Minecraft office where autonomous agents work on software tasks.",
    body: [
      "A collaborative Minecraft office where autonomous agents work on software tasks.",
    ],
    cover: "/media/minecraft_office.png",
    gallery: [],
    links: [{ label: "GITHUB REPO", meta: "View Project", href: "#" }],
    featured: true,
  },
  {
    slug: "noir-chat",
    title: "Noir Chat",
    kind: "WEB APP",
    tags: ["PRIVACY", "REAL-TIME CHAT"],
    excerpt: "A privacy-focused temporary chat app for short-lived private and group conversations.",
    body: [
      "A privacy-focused temporary chat app for short-lived private and group conversations.",
    ],
    cover: "/media/mockup2.jpg",
    gallery: [],
    links: [{ label: "LIVE DEMO", meta: "View Project", href: "#" }],
    featured: true,
  },
];

export const selectedSlugs = [
  "argus",
  "artistly",
  "medishot",
  "minecraft-office",
  "noir-chat",
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

export const heroFrames = [
  "/media/hero.webp",
  "/media/still-08.webp",
  "/media/still-40.webp",
  "/media/shibuya.png",
];
