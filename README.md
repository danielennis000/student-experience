# Student Experience (React + Vite)

Frontend app for the ASU Campus Connect experience, built with React, TypeScript, Ant Design, and Vite.

## Features

### CreateAI Chat Projects
- **CreateAI Chat**: General-purpose AI assistant with web search and event discovery
- **BIO 181 | Chat**: Biology course assistant with syllabus integration and email drafting
- **PSY 101 - Syllabot**: Psychology course syllabus assistant
- **Reflections on BIO 181**: Reflection writing assistant for biology course
- **PSY 101 - Midterm Prep**: Exam preparation assistant

### Demo Workflows

#### CreateAI Chat Flow
1. Web search for ASU events
2. Personalized event recommendations
3. Email drafting for study groups
4. Slack message formatting with schedule conflict checking

#### BIO 181 Chat Flow
1. **Syllabus Query**: Ask about exam dates, course details
   - Response from "BIO 181 Syllabot" (🧬 DNA emoji in ASU gold badge)
   - Shows exam date, time, location, and covered chapters
2. **Email Drafting**: Request professional emails to professors
   - Powered by "BIO 181 Chat" (🧬 DNA emoji in ASU gold badge)
   - Automatically addressed to Professor Wilson
   - Student info: Maria Rodriguez (ASURITE: mrodriguez123)
   - Professional formatting with proper academic tone
   - Direct send capability (no Slack option for professor emails)

### UI Features
- Dark/Light mode toggle
- Collapsible sidebar with project navigation
- Chat history management
- Voice input support
- Avatar mode
- Streaming text responses with thinking states
- Feedback and interaction controls

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Ant Design 5

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the local URL printed by Vite (typically `http://localhost:5173`).

## Build and Preview

- Build for production:
  ```bash
  npm run build
  ```
- Preview the production build locally:
  ```bash
  npm run preview
  ```

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Live URL**: `https://<username>.github.io/student-experience/`
- **Deployment**: Configured via `.github/workflows/deploy.yml`

## Base Path Configuration

Vite base path is configured in [`vite.config.ts`](./vite.config.ts):

- `npm run dev` serves with `base: "/"` for local development.
- `npm run build` outputs with `base: "/student-experience/"` for deployment under that subpath.

This is required because the app uses `import.meta.env.BASE_URL` for static asset/widget paths.

## Environment Variables

- A sample env file exists at `.env.example`.
- Current frontend code does not require custom `VITE_` variables at runtime.
- If API integration is added/expanded, prefer `VITE_*` variables for client-side config.

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatLayout.tsx   # Main chat interface
│   ├── EmailDraft.tsx   # Email composer
│   ├── EventList.tsx    # Event display
│   └── ...
├── contexts/            # React contexts
│   └── DarkModeContext.tsx
├── data/                # Mock data and constants
│   ├── mockData.ts      # Chat history, projects, events
│   └── assets.ts        # Asset paths
└── main.tsx             # App entry point
```

## Project Resources

- Product requirements: [`prd.md`](./prd.md)
- API reference: [`API_DOCUMENTATION.html`](./API_DOCUMENTATION.html)
