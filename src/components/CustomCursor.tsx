import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      if (hidden) setHidden(false);

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"]');
      setHovering(!!interactive);
    };

    const onLeave = () => setHidden(true);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [hidden]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-emerald-glow transition-opacity duration-200 ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ boxShadow: '0 0 8px rgba(0,255,163,0.8)' }}
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 h-8 w-8 rounded-full border transition-all duration-200 ${
          hidden ? 'opacity-0' : 'opacity-100'
        } ${hovering ? 'border-cyan-glow scale-125' : 'border-emerald-glow/50 scale-100'}`}
        style={{ boxShadow: hovering ? '0 0 15px rgba(0,240,255,0.3)' : '0 0 10px rgba(0,255,163,0.2)' }}
      />
    </div>
  );
}
