import { Terminal, Heart, ArrowUp, Mail, Github } from 'lucide-react';

const EMAIL = 'letschoice83@gmail.com';
const GITHUB_URL = 'https://github.com/MahatabHossain221';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-emerald-glow/10 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <button onClick={() => scrollTo('#home')} className="group flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-glow text-space-900">
                <Terminal size={16} strokeWidth={2.5} />
              </span>
              <span className="font-mono text-base font-bold">
                <span className="text-emerald-glow">{'<'}</span>
                <span className="text-white">Mahtab</span>
                <span className="text-cyan-glow">{' />'}</span>
              </span>
            </button>
            <p className="text-center text-sm text-gray-500 lg:text-left">
              Aspiring MERN Stack Developer from Bangladesh.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-gray-400 transition-colors hover:text-emerald-glow"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social + back to top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Email ${EMAIL}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-emerald-glow/40 hover:text-emerald-glow focus:outline-none focus:ring-2 focus:ring-emerald-glow/40"
            >
              <Mail size={18} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-cyan-glow/40 hover:text-cyan-glow focus:outline-none focus:ring-2 focus:ring-cyan-glow/40"
            >
              <Github size={18} />
            </a>
            <button
              onClick={() => scrollTo('#home')}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-emerald-glow/40 hover:text-emerald-glow focus:outline-none focus:ring-2 focus:ring-emerald-glow/40"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-mono text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Mahtab Hossain. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-mono text-xs text-gray-600">
            Built with <Heart size={12} className="text-emerald-glow/60" /> using React & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
