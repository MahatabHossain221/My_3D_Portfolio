import {
  Atom,
  Braces,
  Database,
  GitBranch,
  Github,
  Hash,
  Leaf,
  Server,
  Triangle,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionReveal from './SectionReveal';

interface Skill {
  name: string;
  icon: LucideIcon;
  category: 'frontend' | 'backend' | 'tools';
  status: 'learning' | 'exploring';
  color: string;
}

const SKILLS: Skill[] = [
  { name: 'HTML', icon: Hash, category: 'frontend', status: 'learning', color: '#e34f26' },
  { name: 'CSS', icon: Triangle, category: 'frontend', status: 'learning', color: '#1572b6' },
  { name: 'JavaScript', icon: Braces, category: 'frontend', status: 'learning', color: '#f7df1e' },
  { name: 'React', icon: Atom, category: 'frontend', status: 'learning', color: '#61dafb' },
  { name: 'Tailwind CSS', icon: Leaf, category: 'frontend', status: 'learning', color: '#06b6d4' },
  { name: 'Node.js', icon: Server, category: 'backend', status: 'learning', color: '#68a063' },
  { name: 'Express.js', icon: Server, category: 'backend', status: 'exploring', color: '#ffffff' },
  { name: 'MongoDB', icon: Database, category: 'backend', status: 'exploring', color: '#47a248' },
  { name: 'Git', icon: GitBranch, category: 'tools', status: 'learning', color: '#f05032' },
  { name: 'GitHub', icon: Github, category: 'tools', status: 'learning', color: '#ffffff' },
  { name: 'REST APIs', icon: Zap, category: 'backend', status: 'exploring', color: '#00ffa3' },
];

const CATEGORIES = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools & APIs' },
] as const;

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon;
  const isLearning = skill.status === 'learning';

  return (
    <div
      className="group relative animate-fade-in-up overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-emerald-glow/30 hover:bg-white/[0.05]"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both', opacity: 0 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}15 0%, transparent 60%)`,
        }}
      />

      {/* Icon */}
      <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-space-600/60 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-glow/30">
        <Icon
          size={26}
          className="transition-colors duration-300"
          style={{ color: skill.color }}
        />
      </div>

      {/* Name */}
      <h3 className="relative font-display text-lg font-semibold text-white">{skill.name}</h3>

      {/* Status badge */}
      <div className="relative mt-3 flex items-center gap-2">
        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium ${
            isLearning
              ? 'bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/20'
              : 'bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isLearning ? 'bg-emerald-glow' : 'bg-cyan-glow'} animate-glow-pulse`}
          />
          {isLearning ? 'Learning' : 'Exploring'}
        </span>
      </div>

      {/* Bottom accent line */}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: `linear-gradient(to right, ${skill.color}, transparent)` }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-24 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-glow/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-glow/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-glow" />
            <span className="section-label">02 — Skills</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={150}>
          <p className="mb-12 max-w-2xl text-gray-400">
            Technologies I'm actively learning and exploring on my journey to becoming a MERN Stack
            Developer. Skills marked as{' '}
            <span className="text-emerald-glow">Learning</span> are part of my current curriculum,
            while <span className="text-cyan-glow">Exploring</span> items are next on my roadmap.
          </p>
        </SectionReveal>

        {/* Skill groups by category */}
        <div className="space-y-12">
          {CATEGORIES.map((cat, catIndex) => {
            const skills = SKILLS.filter((s) => s.category === cat.id);
            return (
              <div key={cat.id}>
                <SectionReveal delay={catIndex * 100}>
                  <div className="mb-5 flex items-center gap-3">
                    <h3 className="font-mono text-sm font-medium text-gray-500 tracking-wider uppercase">
                      {cat.label}
                    </h3>
                    <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                </SectionReveal>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {skills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
