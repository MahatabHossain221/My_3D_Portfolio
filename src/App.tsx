import { Component, ReactNode, Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const CodingUniverse = lazy(() => import('@/components/CodingUniverse'));

class Scene3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('3D scene failed to load, using static fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>
      );
    }
    return this.props.children;
  }
}

function Hero3DBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-90">
      <Scene3DErrorBoundary>
        <Suspense fallback={<div className="absolute inset-0 bg-radial-fade" />}>
          <CodingUniverse />
        </Suspense>
      </Scene3DErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-space-500">
      {/* Ambient background layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-space-700 via-space-500 to-space-700" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-glow/[0.04] blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-cyan-glow/[0.04] blur-3xl" />
      </div>

      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        <Hero background3D={<Hero3DBackground />} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
