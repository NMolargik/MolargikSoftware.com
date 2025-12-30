# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Molargik Software portfolio website - a React SPA showcasing iOS/macOS app projects (SetDeck, Mygra, Stork, Waffle). Self-hosted on a UGREEN DXP4800 NAS via Nginx and Cloudflare.

## Commands

```bash
npm run dev      # Start Vite dev server (localhost:5173, network accessible)
npm run build    # TypeScript type check + Vite production build → dist/
npm run lint     # ESLint on all TypeScript/TSX files
npm run preview  # Preview production build locally
```

No test framework is configured.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on git tags matching `v*`. It builds and deploys via SCP to the NAS at `/volume1/web/molargiksoftware`.

## Architecture

**Routing:** Uses HashRouter in production (for static file hosting compatibility) and BrowserRouter in development. The router mode is determined by `import.meta.env.PROD` in `App.tsx`.

**Structure:**
- `src/components/` - Reusable UI components (Navbar, Footer, Hero, ProjectCard, ScreensCarousel, etc.)
- `src/pages/` - Route components (Home, About, Contact, project showcases like SetDeck, Mygra, Stork, Waffle)
- `src/assets/` - Static assets organized by project (logos/, mygra/, setdeck/, stork/, waffle/)

**Styling:** Tailwind CSS with custom brand colors defined in `tailwind.config.js`:
- `brandPurple: #6D00FF`
- `brandOrange: #FF6C00`

Per-project accent colors are set via CSS variables (`--link-accent`, `--accent`) in inline `<style>` tags within page components.

**Special routes:** Waffle routes (`/waffle/*`) hide the main Navbar and Footer for a standalone landing page experience.

## Tech Stack

- React 19 + TypeScript (strict mode)
- Vite 7
- React Router v7
- Tailwind CSS 3.4 + PostCSS
- EmailJS for contact form
- Embla Carousel for image galleries
- Lucide React for icons

## Environment Variables

Contact form requires EmailJS credentials in `.env`:
```
VITE_EMAILJS_SERVICE=<service_id>
VITE_EMAILJS_TEMPLATE=<template_id>
VITE_EMAILJS_PUBLIC=<public_key>
```
