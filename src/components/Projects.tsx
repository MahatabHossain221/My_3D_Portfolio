import { ExternalLink, Github, ImageIcon, Shirt, BookOpen, Bot } from 'lucide-react';
import SectionReveal from './SectionReveal';

interface Project {
  title: string;
  tagline: string;
  description: string;
  icon: typeof Shirt;
  tags: string[];
  status: 'concept';
  accent: string;
}

const PROJECTS: Project[] = [
  {
    title: 'NEX Wear',
    tagline: 'Fashion Store Concept',
    description:
      'A modern e-commerce fashion store concept featuring a clean product grid, category filtering, and a minimalist shopping cart flow. Designed as a front-end showcase.',
    icon: Shirt,
    tags: ['React', 'Tailwind CSS', 'UI/UX'],
    status: 'concept',
    accent: '#00ffa3',
  },
  {
    title: 'Study Planner',
    tagline: 'Student Productivity Concept',
    description:
      'A productivity app concept for students to organize study schedules, track tasks, and visualize progress. Focused on intuitive task management and a calm, focused interface.',
    icon: BookOpen,
    tags: ['React', 'JavaScript', 'Productivity'],
    status: 'concept',
    accent: '#00f0ff',
  },
  {
    title: 'AI Study Assistant',
    tagline: 'Learning Assistant Concept',
    description:
      'A concept for an AI-powered study companion that helps generate summaries, quizzes, and study guides from learning materials. An exploration of integrating AI into education workflows.',
    icon: Bot,
    tags: ['React', 'API', 'AI Concept'],
    status: 'concept',
    accent: '#00ffa3',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <div
      className="group relative animate-fade-in-up overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:border-emerald-glow/25 hover:bg-white/[0.05]"
      style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'both', opacity: 0 }}
    >
      {/* Screenshot / preview area */}
      <div className="relative h-48 overflow-hidden border-b border-white/5 bg-gradient-to-br from-space-300 to-space-500">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-40" />

        {/* Centered icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110"
            style={{
              borderColor: `${project.accent}30`,
              background: `${project.accent}08`,
              boxShadow: `0 0 30px ${project.accent}15`,
            }}
          >
            <Icon size={36} style={{ color: project.accent }} />
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute left-4 top-4 rounded-full bg-space-700/80 px-3 py-1 font-mono text-[10px] text-amber-400 backdrop-blur-sm border border-amber-400/20">
          Concept
        </div>

        {/* Hover overlay for screenshot placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-space-700/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-space-600/80 px-3 py-1.5 font-mono text-xs text-gray-400">
            <ImageIcon size={14} />
            Screenshot coming soon
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
        </div>
        <p className="mb-3 font-mono text-xs tracking-wide text-emerald-glow/80">
          {project.tagline}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-gray-400">{project.description}</p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links — placeholders */}
        <div className="flex gap-3">
          <button
            disabled
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-600 cursor-not-allowed"
            aria-label="GitHub link (not available yet)"
          >
            <Github size={16} />
            <span>Code</span>
          </button>
          <button
            disabled
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-600 cursor-not-allowed"
            aria-label="Live demo (not available yet)"
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </button>
        </div>
      </div>

      {/* Bottom accent */}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
      />
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-glow" />
            <span className="section-label">03 — Projects</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={150}>
          <p className="mb-12 max-w-2xl text-gray-400">
            Here are some project concepts I'm planning and exploring. These are design ideas and
            prototypes — real project details, screenshots, and live links will be added as they're
            completed.
          </p>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
