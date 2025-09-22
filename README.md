# Pokédex

A modern Pokédex experience powered by React 18, Vite, Tailwind CSS, and TypeScript. The interface is responsive, accessible, and optimized for quick browsing across the full Pokédex catalogue.

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement enabled.

## Available Scripts

- `npm run dev` – start the Vite development server.
- `npm run build` – type-check the project and create a production build in `dist/`.
- `npm run preview` – serve the production build locally.
- `npm run lint` – run ESLint across the TypeScript source.

## Architecture Overview

```
src/
├─ app/                    # Application shell, layout, and top-level state
│  ├─ App.tsx              # Root component and page composition
│  └─ components/          # App-level UI primitives (header, etc.)
├─ components/ui/          # Reusable presentation primitives (buttons, spinner)
├─ features/pokedex/       # Pokédex feature modules
│  ├─ api/                 # Fetch clients and API helpers
│  ├─ components/          # Feature-specific UI (cards, grid)
│  ├─ hooks/               # Domain-specific hooks (pagination, data fetching)
│  ├─ types/               # TypeScript contracts for the PokéAPI
│  └─ utils/               # Formatting helpers
├─ lib/                    # Cross-cutting utilities (HTTP client)
└─ main.tsx                # Application entrypoint
```

### Data Fetching

Requests to the public [PokéAPI](https://pokeapi.co/) are routed through a small `fetchJson` helper (`src/lib/apiClient.ts`) and feature-specific light wrappers (`src/features/pokedex/api`). The `usePokedex` hook handles pagination, aborts in-flight requests, and exposes a clean interface to the UI layer.

### Styling

Tailwind CSS powers all styling. Global primitives live in `src/index.css`, while components compose utility classes for layout and stateful feedback (loading overlays, hover states, etc.).

## Performance & Accessibility

- Lazy loading of sprite assets via browser-native `loading="lazy"`
- Abortable fetches prevent race conditions during rapid pagination
- Keyboard focus management via semantic HTML and Tailwind focus utilities
- Type-safe data flow with strict TypeScript configuration

## Next Steps

- Extend search to support type filters and server-side queries
- Add automated accessibility tests (axe / Playwright)
- Cache previously fetched pages to minimize network chatter

