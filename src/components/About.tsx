import { Code2, Cpu, Lightbulb, Rocket } from 'lucide-react';
import SectionReveal from './SectionReveal';

const HIGHLIGHTS = [
  {
    icon: Code2,
    title: 'Web Development',
    desc: 'Building responsive, interactive web applications with React and modern JavaScript.',
  },
  {
    icon: Cpu,
    title: 'Problem Solving',
    desc: 'Breaking down complex challenges into clean, maintainable solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Learning',
    desc: 'Always exploring new tools, frameworks, and best practices in software development.',
  },
  {
    icon: Rocket,
    title: 'MERN Journey',
    desc: 'Working toward full-stack proficiency with MongoDB, Express, React, and Node.js.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <SectionReveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-glow" />
            <span className="section-label">01 — About</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <h2 className="mb-12 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>
        </SectionReveal>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Bio text */}
          <SectionReveal className="lg:col-span-3" delay={150}>
            <div className="glass-panel relative overflow-hidden p-8 sm:p-10">
              {/* Decorative accent */}
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-emerald-glow/5 blur-3xl" />

              <p className="text-lg leading-relaxed text-gray-300">
                I'm <span className="text-emerald-glow font-semibold">Mahtab Hossain</span>, a
                Computer Technology (CST) Diploma student from{' '}
                <span className="text-cyan-glow font-semibold">Bangladesh</span> with a deep
                passion for web development and programming.
              </p>
              <p className="mt-5 leading-relaxed text-gray-400">
                My journey began with curiosity about how websites work. That curiosity grew into a
                dedication to learning full-stack development — starting from HTML and CSS, moving
                through JavaScript and React, and now expanding into the broader MERN stack
                ecosystem with Node.js, Express, and MongoDB.
              </p>
              <p className="mt-5 leading-relaxed text-gray-400">
                I believe in writing clean, readable code and building interfaces that feel
                intuitive and polished. Every project is an opportunity to learn something new and
                refine my craft. I'm excited to grow as a developer and contribute to meaningful
                web experiences.
              </p>

              {/* Code snippet decoration */}
              <div className="mt-8 rounded-xl border border-white/5 bg-space-700/50 p-4 font-mono text-sm">
                <div className="flex gap-1.5 mb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <p className="text-gray-500">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-cyan-glow">developer</span>{' '}
                  <span className="text-gray-600">=</span>{' '}
                  {'{'}
                </p>
                <p className="pl-4 text-gray-500">
                  <span className="text-emerald-glow">name</span>:{' '}
                  <span className="text-amber-300">'Mahtab Hossain'</span>,
                </p>
                <p className="pl-4 text-gray-500">
                  <span className="text-emerald-glow">goal</span>:{' '}
                  <span className="text-amber-300">'MERN Stack Developer'</span>,
                </p>
                <p className="pl-4 text-gray-500">
                  <span className="text-emerald-glow">learning</span>:{' '}
                  <span className="text-amber-300">'always'</span>,
                </p>
                <p className="text-gray-500">{'}'}</p>
              </div>
            </div>
          </SectionReveal>

          {/* Highlights */}
          <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-1">
            {HIGHLIGHTS.map((item, i) => (
              <SectionReveal key={item.title} delay={200 + i * 80}>
                <div className="group glass-panel flex items-start gap-4 p-5 transition-all duration-300 hover:border-emerald-glow/30 hover:bg-emerald-glow/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-glow/20 bg-emerald-glow/5 transition-transform group-hover:scale-110">
                    <item.icon size={20} className="text-emerald-glow" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
