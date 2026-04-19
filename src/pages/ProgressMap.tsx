import { motion } from "motion/react";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCurriculum } from "../contexts/CurriculumContext";
import { useNavigate } from "react-router-dom";

export function ProgressMap() {
  const { userProfile } = useAuth();
  const { themes: curriculum, loading } = useCurriculum();
  const navigate = useNavigate();

  if (!userProfile || loading) return <div className="text-slate-400 p-8">Yükleniyor...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold font-display text-white mb-2">İlerleme Haritası</h1>
        <p className="text-slate-400">Kimya müfredatındaki yolculuğun. İstediğin modülden başlayabilir ve dilediğin gibi ilerleyebilirsin.</p>
      </div>

      <div className="space-y-12">
        {curriculum.map((theme, themeIndex) => (
          <div key={theme.id} className="relative">
            {/* Theme Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">{theme.title}</h2>
              <p className="text-slate-400">{theme.description}</p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {theme.modules.map((mod, modIndex) => {
                const isCompleted = userProfile.completedModules.includes(mod.id);
                
                // Serbest dolaşım: Tüm kilitler kaldırıldı
                const isUnlocked = true;

                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (themeIndex * 0.2) + (modIndex * 0.1) }}
                    className={`glass-card p-6 border-2 transition-all ${
                      isCompleted ? 'border-emerald-500/50 bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:-translate-y-1 cursor-pointer' :
                      isUnlocked ? 'border-cyan-500/50 bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-1 cursor-pointer' :
                      'border-slate-800 bg-slate-900/50 opacity-75 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (isUnlocked) navigate(`/module/${mod.id}`);
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400' :
                        isUnlocked ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-slate-800 text-slate-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> :
                         isUnlocked ? <PlayCircle className="w-6 h-6" /> :
                         <Lock className="w-6 h-6" />}
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-semibold mb-2 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {mod.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {mod.description}
                    </p>
                    
                    {isUnlocked && !isCompleted && (
                      <div className="mt-4 text-sm font-medium text-cyan-400 flex items-center gap-1">
                        Başlamak için tıkla &rarr;
                      </div>
                    )}
                    {isCompleted && (
                      <div className="mt-4 text-sm font-medium text-emerald-400 flex items-center gap-1">
                        Tekrar incele &rarr;
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Connecting Line (Visual only, hidden on mobile) */}
            {themeIndex < curriculum.length - 1 && (
              <div className="hidden md:block absolute left-1/2 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-cyan-500/30 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
