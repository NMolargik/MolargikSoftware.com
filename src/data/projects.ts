// src/data/projects.ts
export interface Project {
  title: string;
  tagline: string;
  image: string;
  live?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    title: 'Ready, Set',
    tagline: 'A Fitness Metric Companion',
    image: '/projects/readyset.jpg',
    live: 'https://apps.apple.com/readyset',
    repo: 'https://github.com/nmolargik/readyset',
  },
  // …Sweetwater, FWPD Scanner, Stork
];