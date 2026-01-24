# Molargik Software LLC

The official portfolio website for **[molargiksoftware.com](https://molargiksoftware.com)** — showcasing iOS, iPadOS, macOS, watchOS, and visionOS applications built by **Nicholas Molargik**.

## About

Molargik Software LLC is an indie development studio founded in 2025, focused on building privacy-first Apple ecosystem applications. Each app is born from real user needs and crafted with native Swift and SwiftUI.

### Featured Apps

| App | Description | Platforms |
|-----|-------------|-----------|
| **[Opalite](https://molargiksoftware.com/#/opalite)** | The ultimate color manager for designers, developers, and digital artists | iOS, iPadOS, macOS, watchOS, visionOS, tvOS |
| **[SetDeck](https://molargiksoftware.com/#/setdeck)** | Structured workout companion with set-by-set tracking and HealthKit sync | iOS, iPadOS, watchOS, visionOS |
| **[Mygra](https://molargiksoftware.com/#/mygra)** | Intelligent migraine journal with on-device AI and weather correlations | iOS, iPadOS, watchOS, visionOS |
| **[Stork](https://molargiksoftware.com/#/stork)** | Delivery tracking and statistics for Labor & Delivery nurses | iOS, iPadOS, macOS, watchOS, visionOS |
| **[Waffle](https://molargiksoftware.com/#/waffle)** | Grid-based browser for iPad with customizable layouts up to 4x4 | iPadOS, macOS, visionOS |

## Tech Stack

- **React 19** + **TypeScript** — Component-driven UI with strict type safety
- **Vite 7** — Lightning-fast dev server and optimized production builds
- **Tailwind CSS 3.4** — Responsive styling with custom brand colors
- **React Router v7** — Client-side navigation (HashRouter in production)
- **Framer Motion** — Smooth animations and transitions
- **Embla Carousel** — Touch-friendly image galleries
- **EmailJS** — Contact form integration
- **Lucide React** — Icon library

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Environment Variables

Create a `.env` file for the contact form:

```
VITE_EMAILJS_SERVICE=<service_id>
VITE_EMAILJS_TEMPLATE=<template_id>
VITE_EMAILJS_PUBLIC=<public_key>
```

## Project Structure

```
src/
├── assets/           # Static assets organized by project
│   ├── logos/
│   ├── mygra/
│   ├── opalite/
│   ├── setdeck/
│   ├── stork/
│   └── waffle/
├── components/       # Reusable UI components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── ScreensCarousel.tsx
│   └── ...
├── pages/            # Route components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── SetDeck.tsx
│   ├── Mygra.tsx
│   ├── Stork.tsx
│   ├── Waffle.tsx
│   └── Opalite.tsx
└── hooks/            # Custom React hooks
```

## Deployment

The site deploys automatically via GitHub Actions on git tags matching `v*`. The workflow builds the project and deploys via SCP to a self-hosted UGREEN DXP4800 NAS running Nginx, with Cloudflare providing DNS and CDN services.

## Brand Colors

```css
--brandPurple: #6D00FF
--brandOrange: #FF6C00
```

Each app page sets its own accent color via CSS custom properties for consistent theming.

## Links

- **Website:** [molargiksoftware.com](https://molargiksoftware.com)
- **GitHub:** [github.com/NMolargik](https://github.com/NMolargik)
- **LinkedIn:** [linkedin.com/in/nicholas-molargik](https://linkedin.com/in/nicholas-molargik)
- **Contact:** nick@molargiksoftware.com

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Built with care in Indiana by Nick Molargik.
