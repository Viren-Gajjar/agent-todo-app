# Agent Todo App

Modern todo web app built with **React**, **TypeScript** and PWA features.

## Features

- Create, read, update and delete tasks.
- Organize todos into multiple projects/lists with tags, due dates and priorities.
- Search and filter by tag, project, due date, priority or completion state.
- Subtasks and checklists.
- Drag‑and‑drop reordering of tasks and lists with keyboard accessibility.
- Recurring tasks (daily, weekly, monthly).
- Reminders via the Notifications API with graceful fallback UI reminders.
- Bulk actions: complete, delete, or move multiple tasks at once.
- Keyboard shortcuts for quick actions (e.g. `N` to add a new task, `/` to focus search).
- Offline‑first Progressive Web App with install prompt and data sync when back online.
- Light/dark themes with automatic system preference detection.
- Import/export tasks as JSON or CSV.
- Onboarding sample data and guided tips for new users.

## Tech stack

- **Framework:** React 18 with TypeScript
- **Build tool:** Vite
- **State management:** Zustand with IndexedDB (via `idb`) for persistence
- **Styling:** Tailwind CSS
- **Testing:** Vitest & Testing Library, Playwright for end‑to‑end tests
- **CI/CD:** GitHub Actions
- **PWA:** Workbox service worker, web manifest and icons

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x recommended)
- npm (comes with Node.js)

### Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/Viren-Gajjar/agent-todo-app.git
cd agent-todo-app/apps/web
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

To build the production version of the app:

```bash
npm run build
```

The output will be in the `dist` directory.

### Preview the build

After building, preview the production build locally:

```bash
npm run preview
```

### Testing

Run unit tests:

```bash
npm run test
```

Run end‑to‑end tests with Playwright:

```bash
npm run e2e
```

## Deployment

This repository is configured to automatically build and deploy the site to **GitHub Pages** via GitHub Actions when changes are pushed to the `main` branch. The workflow file is located at `.github/workflows/deploy.yml`.

The live site will be available at:

```
https://viren-gajjar.github.io/agent-todo-app/
```

Ensure GitHub Pages is enabled for this repository (Source: **GitHub Actions**).

## License

This project is open source under the [MIT License](LICENSE).
