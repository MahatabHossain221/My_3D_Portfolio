import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, FolderGit2, Mail, Sparkles, User } from 'lucide-react';

const SUBTITLE = 'Building the Web, One Component at a Time.';

function useTypewriter(text: string, speed = 70, startDelay = 1200) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      timeoutId = interval as unknown as ReturnType<typeof setTimeout>;
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function PhotoFrame() {
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * 20,
      y: ((e.clientX - cx) / rect.width) * -20,
    });
  };

  return (
    <div
      className="perspective-1000 relative mx-auto w-[280px] sm:w-[320px] md:w-[340px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* Outer rotating rings */}
      <div className="absolute -inset-6 animate-spin-slow rounded-full border border-emerald-glow/10" />
      <div className="absolute -inset-3 animate-spin-reverse-slow rounded-2xl border border-cyan-glow/10" />

      {/* Glow aura */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-emerald-glow/20 via-transparent to-cyan-glow/20 blur-2xl animate-glow-pulse" />

      {/* Frame */}
      <div
        className="preserve-3d relative overflow-hidden rounded-2xl border-2 border-emerald-glow/30 transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          boxShadow:
            '0 0 30px rgba(0,255,163,0.15), 0 0 60px rgba(0,240,255,0.08), inset 0 0 20px rgba(0,255,163,0.05)',
        }}
      >
        {/* Corner accents */}
        <span className="absolute left-0 top-0 z-10 h-6 w-6 border-l-2 border-t-2 border-emerald-glow" />
        <span className="absolute right-0 top-0 z-10 h-6 w-6 border-r-2 border-t-2 border-cyan-glow" />
        <span className="absolute bottom-0 left-0 z-10 h-6 w-6 border-b-2 border-l-2 border-cyan-glow" />
        <span className="absolute bottom-0 right-0 z-10 h-6 w-6 border-b-2 border-r-2 border-emerald-glow" />

        {/* Image or placeholder */}
        <div className="relative aspect-[4/5] w-full bg-space-400">
          {!imgError ? (
            <img
              src="/mahtab_image.jpeg"
              alt="Mahtab Hossain"
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-glow/20 border border-emerald-glow/30">
                <User size={36} className="text-emerald-glow" />
              </div>
              <p className="font-mono text-xs text-gray-500">mahtab_image.jpeg</p>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-500 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-glow/5 via-transparent to-cyan-glow/5" />

          {/* Status badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-space-700/80 px-3 py-1.5 backdrop-blur-sm border border-emerald-glow/20">
            <span className="h-2 w-2 animate-glow-pulse rounded-full bg-emerald-glow" />
            <span className="font-mono text-[10px] text-emerald-glow">Available for work</span>
          </div>
        </div>
      </div>

      {/* Floating tech labels around frame */}
      <span className="absolute -right-4 top-8 animate-float-medium rounded-lg border border-cyan-glow/20 bg-space-600/80 px-2 py-1 font-mono text-[10px] text-cyan-glow backdrop-blur-sm">
        React
      </span>
      <span className="absolute -left-6 bottom-20 animate-float-slow rounded-lg border border-emerald-glow/20 bg-space-600/80 px-2 py-1 font-mono text-[10px] text-emerald-glow backdrop-blur-sm">
        Node.js
      </span>
      <span className="absolute -right-2 bottom-10 animate-float-medium rounded-lg border border-emerald-glow/20 bg-space-600/80 px-2 py-1 font-mono text-[10px] text-emerald-glow backdrop-blur-sm" style={{ animationDelay: '1s' }}>
        MongoDB
      </span>
    </div>
  );
}

export default function Hero({ background3D }: { background3D?: ReactNode }) {
  const { displayed, done } = useTypewriter(SUBTITLE);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* 3D background — injected from App, wrapped in error boundary + suspense */}
      {background3D}

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-radial-fade" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 pt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        {/* Left: text */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Status pill */}
          <div className="mb-6 flex animate-fade-in items-center gap-2 rounded-full border border-emerald-glow/20 bg-emerald-glow/5 px-4 py-2 backdrop-blur-sm">
            <Sparkles size={14} className="text-emerald-glow" />
            <span className="font-mono text-xs text-emerald-glow/90">Computer Technology Student</span>
          </div>

          {/* Name */}
          <h1
            className="animate-fade-in-up font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.2s', animationFillMode: 'both', opacity: 0 }}
          >
            Mahtab <span className="gradient-text animate-gradient-shift">Hossain</span>
          </h1>

          {/* Headline */}
          <h2
            className="mt-3 animate-fade-in-up font-display text-2xl font-medium text-gray-300 sm:text-3xl lg:text-4xl"
            style={{ animationDelay: '0.4s', animationFillMode: 'both', opacity: 0 }}
          >
            Aspiring MERN Stack Developer
          </h2>

          {/* Animated subtitle */}
          <p
            className="mt-4 flex animate-fade-in-up items-center font-mono text-base text-emerald-glow sm:text-lg"
            style={{ animationDelay: '0.6s', animationFillMode: 'both', opacity: 0, minHeight: '1.5em' }}
          >
            <span className="mr-1 text-cyan-glow">$</span>
            {displayed}
            <span
              className={`ml-1 inline-block h-5 w-0.5 bg-emerald-glow ${done ? 'animate-glow-pulse' : 'opacity-100'}`}
            />
          </p>

          {/* Description */}
          <p
            className="mt-6 max-w-xl animate-fade-in-up text-balance text-base text-gray-400 sm:text-lg"
            style={{ animationDelay: '0.8s', animationFillMode: 'both', opacity: 0 }}
          >
            I'm a Computer Technology student from Bangladesh, learning to build modern, responsive
            web applications with React and full-stack technologies.
          </p>

          {/* Buttons */}
          <div
            className="mt-8 flex animate-fade-in-up flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '1s', animationFillMode: 'both', opacity: 0 }}
          >
            <button onClick={() => scrollTo('#projects')} className="btn-primary group">
              <FolderGit2 size={18} />
              Explore My Projects
            </button>
            <button onClick={() => scrollTo('#contact')} className="btn-ghost group">
              <Mail size={18} />
              Contact Me
            </button>
          </div>
        </div>

        {/* Right: photo */}
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both', opacity: 0 }}>
            <PhotoFrame />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-gray-500 transition-colors hover:text-emerald-glow"
        aria-label="Scroll to About"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-scroll-bounce" />
      </button>
    </section>
  );
}
