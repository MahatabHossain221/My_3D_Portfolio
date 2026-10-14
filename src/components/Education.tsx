import { GraduationCap, MapPin, Cpu, Calendar } from 'lucide-react';
import SectionReveal from './SectionReveal';

export default function Education() {
  return (
    <section id="education" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-glow" />
            <span className="section-label">04 — Education</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <h2 className="mb-12 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            My <span className="gradient-text">Education</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={150}>
          <div className="relative mx-auto max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-emerald-glow via-emerald-glow/30 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

            {/* Timeline item */}
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
              {/* Left side (label on desktop) */}
              <div className="hidden flex-1 items-center justify-end sm:flex">
                <div className="text-right">
                  <p className="flex items-center justify-end gap-2 font-mono text-sm text-cyan-glow">
                    <Calendar size={14} />
                    In Progress
                  </p>
                  <p className="mt-1 text-sm text-gray-500">Bangladesh</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-8 top-2 z-10 -translate-x-1/2 sm:left-1/2">
                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-emerald-glow bg-space-500">
                  <div className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-emerald-glow" />
                </div>
                <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-glow/20 blur-md" />
              </div>

              {/* Card */}
              <div className="ml-14 flex-1 sm:ml-0">
                <div className="group glass-panel relative overflow-hidden p-7 transition-all duration-300 hover:border-emerald-glow/30 hover:bg-emerald-glow/5">
                  {/* Glow accent */}
                  <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-emerald-glow/8 blur-2xl transition-opacity group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-glow/20 bg-emerald-glow/5 transition-transform group-hover:scale-110">
                    <GraduationCap size={28} className="text-emerald-glow" />
                  </div>

                  {/* Degree */}
                  <h3 className="font-display text-xl font-bold text-white">
                    Diploma in Engineering
                  </h3>

                  {/* Department */}
                  <div className="mt-3 flex items-center gap-2 text-gray-300">
                    <Cpu size={16} className="text-cyan-glow" />
                    <span className="font-medium">Computer Technology (CST)</span>
                  </div>

                  {/* Location */}
                  <div className="mt-2 flex items-center gap-2 text-gray-400">
                    <MapPin size={16} className="text-emerald-glow/60" />
                    <span>Bangladesh</span>
                  </div>

                  {/* Mobile-only status */}
                  <div className="mt-4 flex items-center gap-2 sm:hidden">
                    <Calendar size={14} className="text-cyan-glow" />
                    <span className="font-mono text-sm text-cyan-glow">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
