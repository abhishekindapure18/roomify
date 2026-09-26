# Roomify

Roomify is an AI-powered design tool that turns a 2D floor plan image into a photorealistic 3D visualization. Upload a floor plan, generate a rendered view with AI, and manage your design projects from a single dashboard.

## Features

- **Drag-and-drop upload** — upload floor plan images (JPG, PNG, WEBP) with live progress feedback
- **AI-generated 3D renders** — converts an uploaded floor plan into a rendered 3D view using an image-generation model
- **Project dashboard** — browse previously created projects with thumbnails and timestamps
- **Cloud-hosted assets** — source and rendered images are uploaded to hosted storage so projects can be viewed and shared via a stable URL
- **Authentication** — sign in required to upload and save projects

## Tech Stack

- **Framework:** [React Router](https://reactrouter.com/) (v8) in framework mode, with server-side rendering
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS v4
- **Icons:** lucide-react
- **Backend services:** [Puter.js](https://puter.com/) — used for authentication, key-value storage, file hosting, and AI image generation (via a Puter Worker)
- **Build tooling:** Vite 8
- **Containerization:** Docker (multi-stage build)

## Architecture

```
app/
  root.tsx              # App shell, layout, global providers
  routes.ts              # Route definitions
  routes/
    home.tsx             # Landing page: hero, upload, project grid
    visualizer.$id.tsx   # Single-project 3D visualizer view
  app.css                 # Global styles (Tailwind)

components/
  Navbar.tsx
  Upload.tsx              # Drag-and-drop uploader with progress state
  ui/
    Button.tsx            # Shared button component

lib/
  ai.action.ts            # Calls the AI model to generate the 3D render
  puter.action.ts         # Auth + project create/list actions
  puter.hosting.ts        # Uploads images to hosted storage, manages hosting config
  puter.worker.js         # Puter Worker: backend API routes (save/list/get project)
  constants.ts            # Prompts and config constants
  utils.ts                # Shared helper functions
```

**How it works:**
1. A user signs in and uploads a floor plan image through the `Upload` component.
2. The image is sent to the AI service (`ai.action.ts`), which returns a generated 3D render.
3. Both the source and rendered images are pushed to hosted storage (`puter.hosting.ts`) so they're accessible via a permanent URL.
4. Project metadata (source URL, render URL, timestamps) is persisted through a Puter Worker backend (`puter.worker.js`), which exposes REST-style endpoints for saving, listing, and fetching projects.
5. The dashboard (`home.tsx`) lists saved projects; clicking one opens `visualizer/:id` for a detailed view.

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm
- A [Puter](https://puter.com/) account (used for auth, storage, and AI generation)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abhishekindapure18/roomify.git
cd roomify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
VITE_PUTER_WORKER_URL=<your-puter-worker-url>
```

This should point to your deployed Puter Worker, which handles the `/api/projects/*` endpoints defined in `lib/puter.worker.js`.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run React Router type generation and TypeScript checks |

## Building for Production

```bash
npm run build
npm run start
```

## Docker

A multi-stage `Dockerfile` is included for containerized deployment.

```bash
docker build -t roomify .
docker run -p 3000:3000 --env-file .env.local roomify
```

## Project Structure Notes

- Routing is defined declaratively in `app/routes.ts` using React Router's config-based routing.
- All AI, auth, storage, and hosting logic is isolated in `lib/`, keeping route and component files focused on UI.
- The Puter Worker (`lib/puter.worker.js`) acts as a lightweight backend, deployed separately, that mediates authenticated read/write access to project data.

## License

This project is for personal/portfolio use.
