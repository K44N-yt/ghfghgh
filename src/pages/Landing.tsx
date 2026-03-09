import { Link } from 'react-router-dom';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { TopicsSection } from '../components/TopicsSection';
import { GamificationSection } from '../components/GamificationSection';
import { Footer } from '../components/Footer';
import { Atom } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans text-slate-50 overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-50 glass-card rounded-none border-x-0 border-t-0 border-b-white/10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              <Atom className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-white">ReactionLab</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium transition-colors"
            >
              Giriş Yap
            </Link>
            <Link 
              to="/register"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-sm font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection onStart={() => navigate('/register')} />
        <FeaturesSection />
        <TopicsSection />
        <GamificationSection />
      </main>

      <Footer />
    </div>
  );
}
