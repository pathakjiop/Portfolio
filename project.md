# Atharv Pathak --- Complete Project Portfolio & Current Build Log

> A consolidated, developer-friendly reference for my projects: what
> each project does, why it exists, its main features, technology
> choices, architecture, and what I am currently building or improving.
>
> **Accuracy note:** This document consolidates project details shared
> across conversations. A project being listed here does not
> automatically mean it is production-ready or fully complete. Where the
> latest implementation status is unclear, I label it **Status to
> verify** rather than claiming it is finished.

## Table of Contents

1.  [About Me](#about-me)
2.  [Current Builds and Recent Work](#current-builds-and-recent-work)
3.  [Major Projects](#major-projects)
    -   [UAI --- Unified Authentication
        Interface](#1-uai--unified-authentication-interface)
    -   [MediShot / MedNoteClassifier](#2-medishot--mednoteclassifier)
    -   [ARGUS --- Local AI-to-Windows Execution
        Gateway](#3-argus--local-ai-to-windows-execution-gateway)
    -   [Minecraft Office](#4-minecraft-office)
    -   [Noir Chat](#5-noir-chat)
    -   [Service Bot](#6-service-bot--pureframe-labs-internship)
    -   [Artistly](#7-artistly)
    -   [Ayurvedic Information System](#8-ayurvedic-information-system)
    -   [pkgman --- Rust TUI Package
        Manager](#9-pkgman--rust-tui-package-manager)
4.  [Other Projects](#other-projects)
5.  [Hardware, Automation, and
    Experiments](#hardware-automation-and-experiments)
6.  [Technology Map](#technology-map)
7.  [How to Explain These Projects](#how-to-explain-these-projects)
8.  [Status and Next-Step Checklist](#status-and-next-step-checklist)

------------------------------------------------------------------------

## About Me

I am a final-year Bachelor of Engineering student in Information
Technology with a strong focus on Python, full-stack development,
automation, AI-enabled applications, and practical software engineering.

My project work spans:

-   **Backend development:** Python, FastAPI, Flask/Django concepts,
    Node.js, Express, REST APIs.
-   **Frontend and mobile:** React, Next.js, Tailwind CSS, TypeScript,
    React Native, Expo, Ionic.
-   **Data and storage:** PostgreSQL, MySQL, Supabase.
-   **Automation and browser tooling:** Playwright, task queues, APIs,
    WhatsApp-oriented workflows.
-   **AI and document processing:** OCR, LLM APIs, prompt workflows,
    medicine-image interpretation concepts.
-   **Systems programming:** Rust, Ratatui, terminal user interfaces,
    Linux tooling.
-   **Identity and security concepts:** OAuth 2.0, OpenID Connect, JWT,
    verifiable credentials, decentralized identifiers, QR-based flows.
-   **Hardware experiments:** Arduino/ESP32, sensors, OLED displays, and
    QR-display concepts.

My preferred direction is Python-first backend engineering, AI/LLM
applications, APIs, automation, and full-stack product development. I am
also learning and experimenting with Rust for systems tools.

## Current Builds and Recent Work

The following are the most relevant ongoing or recently discussed
workstreams. Exact completion status should be updated from the current
repositories before this document is used as a formal project-status
report.

### 1. MediShot --- medicine image understanding

**Goal:** Build an application that helps a user interpret a
poor-quality, cropped, blurry, or partially unreadable medicine image
and presents useful medicine-related information when the available
evidence is sufficient.

**Current product direction** - User submits or captures a medicine
image. - Image-processing/OCR pipeline attempts to extract visible
text. - The system tries to identify the likely medicine and organize
information such as name, dosage text, and related details. - The
interface presents the result in a readable, structured format. -
Uncertain or unreadable details should be shown as uncertain instead of
guessed.

**Known stack:** Python, FastAPI, React Native, Expo, TypeScript, OCR
tooling such as Tesseract/EasyOCR, and data-processing tools such as
Pandas.

**Important safety/product rule:** Medicine identification from an image
is error-prone. The app should not invent a dosage or treatment
instruction. It should show confidence/uncertainty, preserve the
original extracted text, and ask the user to confirm the package or
consult a pharmacist/clinician for consequential decisions.

**Current status:** Identified in prior discussions as a
major/final-year project under development. Confirm implementation
details and current feature completion against the repository.

### 2. UAI --- Unified Authentication Interface

**Goal:** Develop a unified identity/authentication experience inspired
by the convenience of UPI IDs. A user should be able to use a UAI ID and
a QR-based flow to authenticate with participating service providers
while sharing only the information needed for a transaction.

**Two distinct surfaces** - **UAI citizen/mobile app:** citizen-facing
identity wallet, credential access, consent, QR scanning, and
authorization. - **UAI service-provider portal:** for businesses and
service providers to register, manage their account, generate/display QR
codes, and review access logs. It is not the citizen app.

**Core flow** 1. A trusted source verifies a person's identity. 2. An
authorized issuer issues a verifiable credential. 3. The credential is
stored in the user's wallet. 4. A unique UAI ID, for example
`username@uai.in`, is associated with the user's account. 5. A service
provider presents a QR code. 6. The user reviews the request and
consents to share the required information. 7. The service verifies the
response and records an appropriate access log.

**Key features discussed** - Unique UAI ID generation and availability
checking. - QR-based authentication. - Selective disclosure / minimum
necessary data sharing. - Wallet-based credential storage. - Biometric
unlock or authorization on supported devices. - Service-provider
registration and portal. - QR generation and printing for offline use. -
API-backed verification and logs for online use. - Potential DigiLocker
integration, subject to actual integration and authorization.

**Offline and online distinction** - **Offline mode:** a permanent QR
can identify a provider or initiate a local workflow, but a QR alone
cannot prove current identity validity or create a live audit record
without a suitable verification mechanism. - **Online mode:** the
permanent provider QR can start a network-backed authentication flow,
allowing API verification and server-side event logging. - **Provider
integration:** permanent provider QR plus a secure UAI API is the
intended direction.

**Known / discussed stack:** FastAPI, PostgreSQL, React, React Native,
OAuth 2.0, OpenID Connect (OIDC), JWT, verifiable credentials (VCs),
decentralized identifiers (DIDs), QR codes, and a possible ESP32 QR
display prototype.

**Architecture principles** - Keep citizen features in the mobile app
and business-management features in the provider portal. - Keep
credential issuance and verification responsibilities explicit. - Use
consent, expiry, revocation/status checks, secure token handling, and
minimal disclosure. - Do not claim legal or government acceptance until
formal partnerships and compliance work exist.

**Current status:** A major concept/prototype with portal, mobile,
identity, QR, and API requirements developed across prior planning.
Verify which flows are implemented end-to-end.

### 3. ARGUS --- Local AI-to-Windows Execution Gateway

**Goal:** Create a security-first gateway that allows an AI system to
request desktop or Windows actions through a structured, inspectable
execution layer instead of giving the model unrestricted control.

**Conceptual workflow** 1. The AI produces a structured action plan. 2.
The gateway validates the plan and its parameters. 3. Policy checks
determine whether each action is allowed, needs confirmation, or must be
rejected. 4. An execution layer runs approved actions. 5. The system
records an audit trail and returns the result.

**Features discussed** - Structured action plans. - Token-authenticated
WebSocket communication. - Risk-based permission checks and user
approval for sensitive actions. - Sandboxing and constrained
execution. - Emergency stop. - Audit logs. - Desktop automation and a
browser extension. - Mock/dry-run modes for testing without performing
real actions.

**Why it matters:** AI agents that can operate a computer need an
explicit boundary between planning and execution. ARGUS explores
validation, authorization, observability, and controlled execution.

**Status:** Previously described as an advanced project concept/design.
Confirm which modules currently exist in code before presenting all
features as implemented.

### 4. Minecraft Office

**Goal:** Explore an interactive office/workspace environment inside
Minecraft, connected to external services and AI-driven behavior.

**Known stack discussed:** Java 21, PaperMC, Citizens, Python, FastAPI,
PostgreSQL, Claude 3.5 Sonnet, and a component referred to as Orion.

**High-level areas** - Minecraft server/plugin behavior. - NPCs or
character interactions using Citizens. - A Python API/service for
external logic. - PostgreSQL for persistent data where required. -
LLM-backed dialogue or task behavior. - Integration between the
Minecraft environment and external application services.

**What to clarify in a demo** - Which features are implemented in the
Minecraft plugin. - What the Python service owns. - How prompts/context
are sent to the LLM. - How state is stored and recovered. - What Orion
refers to in the current implementation.

**Status:** Project discussed and used as a resume project. Verify the
current feature list and deployment status.

### 5. Noir Chat

**Goal:** A temporary/private chat experience for direct and group
conversations.

**Known stack:** React, Tailwind CSS, Node.js/Express,
Supabase/PostgreSQL, with deployment discussed using Vercel and Render.

**Product areas** - Temporary or private conversations. - Group chat. -
A focused, minimal chat interface. - Backend endpoints for conversation
behavior. - Database-backed persistence where needed.

**Security considerations** - "Private" should be backed by a defined
threat model and actual access controls. - Temporary messages need an
explicit retention/deletion policy. - Do not claim end-to-end encryption
unless it has actually been implemented and tested. - Validate
authorization on the server, not only in the UI.

**Status:** Previously described as built/prototyped. Verify the current
deployed version, retention behavior, and access controls.

### 6. Service Bot --- Pureframe Labs Internship

**Goal:** Automate a paid document-retrieval workflow for
land/property-related records. The system retrieves relevant PDF
documents from an external website, processes the result, and delivers
it to the user.

**Internship context:** Software Developer Intern at Pureframe Labs Pvt.
Ltd., from 1 May 2026 to 26 June 2026.

**Workflow discussed** 1. User requests a document. 2. The service
accepts payment (₹30 was discussed for one flow). 3. A worker automates
the relevant website using Playwright. 4. The worker locates and
downloads the PDF. 5. The result is stored/tracked. 6. The document is
sent to the user, with WhatsApp delivery discussed. 7. The user can view
document history; admins can monitor jobs and notifications.

**Known stack:** Python, Playwright, RabbitMQ, PostgreSQL, APIs, and
web/admin components. Bun, Hono, and TypeScript were also discussed in
the broader service architecture.

**Operational challenges discussed** - A scraper target of approximately
20,000--25,000 records. - A run of roughly 5,000 records taking about 8
hours, indicating a need for throughput and reliability improvements. -
API errors including HTTP 503 and 500. - CORS issues during API
integration. - Queueing, retries, failure handling, and status tracking.

**Engineering lessons** - Use queues for long-running jobs instead of
keeping a request open. - Make jobs idempotent where possible. - Add
retry/backoff policies and dead-letter handling. - Track job states and
expose useful errors. - Respect website terms, access restrictions, and
applicable privacy requirements. - Separate payment confirmation from
document retrieval and delivery.

**Status:** Work performed during the internship; not necessarily an
actively maintained personal project. Describe only the work you
personally implemented.

### 7. Artistly

**Goal:** An artist-oriented marketplace/platform for discovering
artists and handling enquiries, bookings, and quotations.

**Known stack discussed:** Next.js/React, TypeScript, Tailwind CSS,
PostgreSQL, and a Spring Boot backend in one version of the project
plan.

**Feature areas discussed** - Artist profiles and discovery. -
Booking/enquiry workflows. - Quotations. - Approval and role-based
access. - JWT authentication and role-based access control (RBAC). -
Data persistence for users, profiles, and booking information.

**Status:** Project discussed as a full-stack application. Confirm which
backend stack and features are present in the latest repository before
describing it publicly.

### 8. Ayurvedic Information System

**Goal:** Make information about Ayurvedic herbs, treatments, and
medicines easier to explore through a digital information system.

**Known stack:** React and Python.

**Context:** Google Solution Challenge project; you described being the
team leader.

**Feature direction** - Browse information about herbs and medicines. -
Present treatment-related information in a structured, accessible
interface. - Organize educational content for easier discovery. - Keep
medical claims sourced and distinguish educational information from
professional advice.

**Team/community work:** You also described coordinating workshops and
mentoring in student developer communities. Keep those activities
separate from the technical features of this project on a resume.

**Status:** A prior team project. Verify its final feature set and
whether it remains deployed.

### 9. pkgman --- Rust TUI Package Manager

**Goal:** Build a terminal user interface for package-management
workflows on Arch Linux, with an emphasis on discoverability and
dependency inspection.

**Known stack:** Rust, Ratatui, TOML configuration, and integration with
pacman/AUR-related workflows.

**Features discussed** - Package search and details. -
pacman/AUR-related integration. - Dependency visualization, including a
`pactree`-style workflow. - Themes. - Asynchronous reloads. - TOML
configuration. - Terminal-based interaction.

**Engineering areas** - Process execution and command output handling. -
Async UI/state updates. - Safe handling of package-manager commands. -
Clear distinction between searching, inspecting, and installing/removing
packages.

**Status:** Previously described as built. Confirm supported operations
and current reliability before calling it a complete package manager.

------------------------------------------------------------------------

## Other Projects

These projects were also mentioned in earlier project inventories. Their
descriptions below are intentionally conservative where implementation
details were limited.

### 10. Prompt Generator AI

**Goal:** A web application that helps users create or refine prompts.

**Known stack:** React, Express, Node.js.

**Likely product areas to document from the repository:** input form,
prompt-generation logic, output formatting, API integration, and any
saved prompt history. Do not claim a particular LLM provider or advanced
prompt-engineering feature unless it is present in the code.

**Status:** Status to verify.

### 11. LeetCode Extension

**Goal:** A browser extension related to the LeetCode coding workflow.

**Known stack:** JavaScript and Chrome Extension APIs.

**To document from code:** the exact user problem it solves, which pages
it integrates with, what information it reads, and whether it stores
user preferences locally or remotely.

**Status:** Status to verify.

### 12. Healthy Lifestyle

**Goal:** A lifestyle-related application or assistant.

**Known stack:** Python and Gemini API.

**To document from code:** the actual inputs, recommendations, data
sources, and output format. Any health-related suggestions should be
clearly scoped and not presented as diagnosis.

**Status:** Status to verify.

### 13. Cloth Shop Management System

**Goal:** A desktop application for managing a clothing shop's records
and day-to-day operations.

**Known stack:** Python, Tkinter, MySQL.

**Likely areas to confirm:** product records, customer information,
sales/stock management, search, and database operations. Only list the
features that exist in the actual app.

**Status:** Status to verify.

### 14. Geolocation Attendance

**Goal:** An attendance application using location-aware functionality.

**Known stack:** Ionic, Capacitor, JavaScript.

**To document from code:** how location permission is requested, how
attendance is recorded, how spoofing or inaccurate location is handled,
and whether there is a backend.

**Status:** Status to verify.

### 15. Password Manager

**Goal:** Manage saved credentials through a user interface.

**Stack mentioned across project notes:** React and Python; a React
frontend with a Python service was discussed.

**Important security requirements:** passwords must not be stored as
plaintext; use an appropriate encryption design, protect the master
secret, avoid logging credentials, and document the threat model. Do not
claim secure vault-grade behavior without validating the implementation.

**Status:** Status to verify.

### 16. BMI Calculator

**Goal:** Calculate Body Mass Index from height and weight inputs.

**Status:** Small utility project. Confirm its implementation language
and interface from the repository.

### 17. Portfolio Website

**Goal:** A personal portfolio to present your profile, projects,
skills, and contact information.

**Known stack discussed:** React/Next.js and Tailwind CSS.

**Recent UI work:** Recent conversations included adjusting the hero
portrait image positioning and sizing with responsive Tailwind classes.
A two-pixel horizontal adjustment was requested, suggesting that the
portfolio's visual layout is being refined.

**Areas to keep consistent** - Clear project descriptions and real
screenshots. - Responsive layout. - Accurate technologies and project
status. - Accessible contrast and readable typography. - Links to
repositories or live demos only when they are valid.

**Status:** Active/recent UI refinement; confirm the latest deployed
version.

### 18. BMI Calculator, Mini School Management System, Simple Notes, and Other Small Utilities

These appeared in earlier project inventories. Keep them in the
portfolio if their repositories are available and they demonstrate a
useful skill or a completed learning milestone.

For each, add: - The problem it solves. - Its main user flow. - The
actual technology stack. - One technically interesting implementation
detail. - A repository/demo link. - A truthful status: prototype,
completed, deployed, or archived.

### 19. WhatsApp Automation Bot

**Goal:** Automate a WhatsApp-related workflow.

**Context:** WhatsApp delivery was also part of the Service Bot
workflow. Keep this as a separate project only if it has an independent
codebase or distinct functionality.

**To verify:** whether it uses an official API or browser automation,
its intended use, rate limits, consent handling, and error recovery.

### 20. Project JSON Builder

**Goal:** A utility for building or generating structured JSON project
data.

**Status:** Mentioned in a prior inventory; exact features and stack
need verification.

### 21. VectorDB

**Goal:** A vector-database or vector-search experiment.

**Status:** Mentioned in a prior inventory; verify the actual
implementation, embedding model, storage backend, and search workflow
before adding technical claims.

### 22. NARIYAL --- Tender Coconut Water Branding

**Goal:** A product/branding concept for tender coconut water.

**Known context:** Packaging and branding were explored. This is a
product-design/branding concept rather than necessarily a software
project.

**To document:** brand positioning, packaging direction, target
audience, visual identity, and any mockups or user research.

### 23. UAI QR / ESP32 Display Experiment

**Goal:** Explore hardware-assisted display or presentation of QR codes
for UAI-related offline/service-provider scenarios.

**Context:** ESP32 and Arduino setup work was discussed, including
serial-monitor output, board selection, and missing COM-port/upload
problems. OLED and sensor code also appeared in recent practical
preparation.

**Important distinction:** An ESP32 display prototype is not the same as
the full UAI authentication system. It may display a QR code or provide
a hardware interface, while identity verification and API-backed logging
require the relevant backend and network flow.

**Status:** Hardware setup and practical experimentation were recently
discussed. Verify whether the QR display itself is implemented.

------------------------------------------------------------------------

## Hardware, Automation, and Experiments

### Arduino / ESP32 practical work

Recent discussions included simplifying embedded C/C++ examples for a
practical exam, working with an SSD1306 OLED display and DHT11 sensor,
and troubleshooting ESP32 upload/serial-port detection.

**Topics encountered** - Arduino sketch structure: `setup()` and
`loop()`. - Serial output and basic debugging. - Board/FQBN selection. -
COM-port and USB-driver troubleshooting. - OLED display
initialization. - Sensor initialization and reading.

These are useful learning experiments, but should not be described as a
complete product unless they are part of a larger implemented system.

### Desktop and browser automation

Across Service Bot and ARGUS, recurring engineering themes include: -
Browser automation. - Long-running job execution. - Structured action
plans. - Error handling and retries. - Logging and auditability. -
Permission boundaries for actions that affect external systems.

------------------------------------------------------------------------

## Technology Map

  -----------------------------------------------------------------------
  Area                                Technologies discussed
  ----------------------------------- -----------------------------------
  Primary backend language            Python

  API frameworks                      FastAPI; Flask/Django also part of
                                      the broader skill set

  Frontend                            React, Next.js, Tailwind CSS

  Mobile                              React Native, Expo, Ionic,
                                      Capacitor

  JavaScript backend                  Node.js, Express, Bun, Hono

  Databases                           PostgreSQL, MySQL, Supabase

  Browser automation                  Playwright

  Queues                              RabbitMQ

  OCR / data processing               Tesseract, EasyOCR, Pandas

  AI integrations                     Claude and Gemini APIs;
                                      project-specific LLM workflows

  Systems programming                 Rust, Ratatui

  Minecraft                           Java 21, PaperMC, Citizens

  Identity/security concepts          OAuth 2.0, OIDC, JWT, VCs, DIDs

  Hardware experiments                ESP32, Arduino, SSD1306 OLED, DHT11
  -----------------------------------------------------------------------

**Important:** This table lists technologies discussed across projects,
not a claim that every technology is used in every project or that all
integrations are production-ready.

## How to Explain These Projects

Use this structure in interviews, presentations, and resume
descriptions:

1.  **Problem:** What real problem did you identify?
2.  **User:** Who experiences that problem?
3.  **Solution:** What does the application do from the user's
    perspective?
4.  **Architecture:** What are the frontend, backend, database, and
    external services responsible for?
5.  **Your contribution:** Which parts did you personally implement?
6.  **Technical challenge:** What failed or was difficult, and how did
    you address it?
7.  **Evidence:** Can you show a repository, demo, screenshots, tests,
    or measured results?
8.  **Limitations and next steps:** What remains incomplete?

### Example: MediShot

"MediShot is a medicine-image understanding project. The user submits a
medicine image, and the application uses OCR and image-processing
workflows to extract visible information and help organize the likely
medicine details. The mobile client is built with React Native/Expo and
the backend uses Python/FastAPI. A key challenge is handling blurry or
incomplete images without presenting uncertain information as fact. The
next engineering priorities are confidence-aware extraction, clear user
confirmation, and validation of the end-to-end workflow."

### Example: UAI

"UAI is a proposed unified authentication experience built around a UAI
ID, QR-based service-provider flows, and consent-driven credential
sharing. The design separates the citizen mobile app from the
service-provider portal. The architecture explores FastAPI, PostgreSQL,
React/React Native, OAuth/OIDC, JWT, and verifiable credentials. The
main challenge is ensuring that the QR is only an entry point and that
actual authentication, consent, verification, and audit events are
handled securely."

### Example: Service Bot

"During my software development internship, I worked on automating a
document-retrieval workflow involving browser automation, background
jobs, database tracking, and document delivery. Playwright handled
browser interaction, RabbitMQ was used for queued work, and PostgreSQL
supported persistent records. Reliability challenges included slow
scraping, external-service errors, and API integration issues."

### Example: pkgman

"pkgman is a Rust terminal UI project focused on making Linux package
workflows easier to inspect. It uses Ratatui and explores
pacman/AUR-related operations, package details, and dependency
visualization. The interesting engineering areas are terminal UI state,
asynchronous refreshes, command integration, and safe execution."

------------------------------------------------------------------------

## Status and Next-Step Checklist

Use this checklist to turn this reference into a fully verified
portfolio.

### Verify every project

-   [ ] Confirm repository name and current branch.
-   [ ] Mark the project as `Idea`, `Prototype`, `In Development`,
    `Completed`, `Deployed`, or `Archived`.
-   [ ] Check which listed features actually work.
-   [ ] Confirm the real stack from dependency files and source code.
-   [ ] Add screenshots or a short demo.
-   [ ] Add a valid repository link and live demo link, where available.
-   [ ] Record your individual contribution if it was a team project.
-   [ ] Include tests, performance results, or other measurable evidence
    only when verified.
-   [ ] Remove unused technologies and aspirational features from the
    public-facing description.
-   [ ] Add known limitations and next steps.

### Suggested order for polishing the portfolio

1.  **MediShot:** document the actual end-to-end image-to-result
    pipeline and make uncertainty/safety behavior clear.
2.  **UAI:** clearly distinguish implemented prototype flows from the
    larger identity-system vision; document trust, consent, and
    verification boundaries.
3.  **ARGUS:** demonstrate the plan-validation and permission boundary
    in a safe dry-run, if implemented.
4.  **Minecraft Office:** prepare a diagram showing the Minecraft
    plugin, Python API, database, and LLM interaction.
5.  **Noir Chat:** document privacy, message retention, and access
    control accurately.
6.  **pkgman:** provide a terminal recording and a clear list of
    supported package operations.
7.  **Portfolio website:** make every project card accurate, visually
    consistent, and linked to working evidence.
8.  **Service Bot:** preserve a clear account of your own internship
    contribution and the measurable operational challenges you worked
    on.

### Suggested project status template

Copy this block for each repository and fill in the verified details:

``` markdown
## Project Name

- **Status:** Idea / Prototype / In Development / Completed / Deployed / Archived
- **Problem:**
- **Target users:**
- **Solution:**
- **My contribution:**
- **Frontend:**
- **Backend:**
- **Database:**
- **External services / AI:**
- **Implemented features:**
- **Known limitations:**
- **Most difficult technical challenge:**
- **What I learned:**
- **Next milestone:**
- **Repository:**
- **Live demo:**
- **Screenshots / demo video:**
```

## Final Note

This file is intended to be the central reference for your project
portfolio and current build direction. It combines major projects,
smaller utilities, internship work, hardware experiments, and branding
concepts. Before using it as a resume, public README, or formal status
report, verify implementation status and personal contributions against
the source repositories. This avoids presenting planned features as
completed work.
