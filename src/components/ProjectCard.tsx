// src/components/ProjectCard.tsx
// src/components/ProjectCard.tsx
import { Link } from 'react-router-dom';

/**
 * Simple shape for project data.
 * Extend as needed (e.g. add `live`, `repo`, etc.).
 */
export interface Project {
  /** Display name shown on the card. */
  title: string;
  /** Short tagline under the title. */
  tagline: string;
  /** Path (relative URL) to a cover image. */
  image: string;
  /** Where the card should navigate when clicked. */
  path: string;
}

/**
 * A vertical, clickable project card:
 * – Image is dimmed by default.
 * – On hover the image brightens & text slides down / fades out.
 * – Clicking the card navigates via react‑router to `path`.
 */
export default function ProjectCard({
  title,
  tagline,
  image,
  path,
}: Project) {
  return (
    <Link
      to={path}
      className="group relative block overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
    >
      {/* Cover image */}
      <img
        src={image}
        alt={title}
        className="h-96 w-full object-cover brightness-50 transition duration-300 group-hover:brightness-100"
      />

      {/* Dark gradient overlay that fades on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      {/* Title + tagline block that slides down & fades on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 px-6 text-left transition-all duration-300 group-hover:translate-y-4 group-hover:opacity-0">
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-200">{tagline}</p>
      </div>
    </Link>
  );
}