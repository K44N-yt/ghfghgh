import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCurriculum } from '../contexts/CurriculumContext';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Zap, Trophy, PlayCircle } from 'lucide-react';
import { MoleculeViewer } from '../components/MoleculeViewer';
import { MatchingGame } from '../components/MatchingGame';

export function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { userProfile, completeModule, awardBadge } = useAuth();
  const { themes: curriculum, loading } = useCurriculum();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Dynamic XP tracking
  const [earnedXp, setEarnedXp] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [matchingFinished, setMatchingFinished] = useState(false);

  if (loading) return <div className="text-center py-20 text-slate-400">Yükleniyor...</div>;

  // Find module
  let moduleData = null;
  let themeData = null;
  for (const theme of curriculum) {
    const mod = theme.modules.find(m => m.id === moduleId);
    if (mod) {
      moduleData = mod;
      themeData = theme;
      break;
    }
  }

  useEffect(() => {
    if (userProfile && moduleData && userProfile.completedModules.includes(moduleData.id)) {
      setCompleted(true);
    }
  }, [userProfile, moduleData]);

  if (!moduleData || !themeData) {
    return <div className="text-center py-20 text-slate-400">Modül bulunamadı.</div>;
  }

  const handleComplete = async () => {
    if (!completed) {
      const isFirst = userProfile?.completedModules.length === 0;
      
      await completeModule(moduleData.id);
      
      // Check for badges (e.g., first module completed)
      if (isFirst) {
        await awardBadge('kimya_kasifi');
      }
      
      setCompleted(true);
    }
    navigate('/map');
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === moduleData.questions![currentQuestion].answer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < moduleData.questions!.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleMatchingComplete = () => {
    setMatchingFinished(true);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <button 
        onClick={() => navigate('/map')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Haritaya Dön
      </button>

      <div className="mb-8">
        <div className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
          {themeData.title}
        </div>
        <h1 className="text-3xl font-bold font-display text-white mb-4">{moduleData.title}</h1>
        
        <div className="flex items-center gap-4">
          {completed && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Tamamlandı
            </span>
          )}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 border-cyan-500/20"
      >
        {/* LESSON TYPE */}
        {moduleData.type === 'lesson' && (
          <div className="space-y-8">
            {moduleData.blocks && moduleData.blocks.length > 0 ? (
              <div className="space-y-8">
                {moduleData.blocks.map((block) => (
                  <div key={block.id}>
                    {block.type === 'text' && (
                      <div className="prose prose-invert max-w-none">
                        {block.text?.split('\n').map((paragraph, idx) => {
                          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>;
                          }
                          if (paragraph.startsWith('- ')) {
                            return <li key={idx} className="text-slate-300 ml-4 mb-2">{paragraph.substring(2)}</li>;
                          }
                          if (paragraph.trim() === '') return <br key={idx} />;
                          
                          const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                          return (
                            <p key={idx} className="text-slate-300 leading-relaxed mb-4 text-lg">
                              {parts.map((part, i) => 
                                part.startsWith('**') && part.endsWith('**') 
                                  ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong> 
                                  : part
                              )}
                            </p>
                          );
                        })}
                      </div>
                    )}
                    
                    {block.type === 'image' && block.imageUrl && (
                      <div className={`flex ${block.imageAlign === 'left' ? 'justify-start' : block.imageAlign === 'right' ? 'justify-end' : 'justify-center'} my-6`}>
                        <img src={block.imageUrl} alt="Ders İçeriği" className="max-h-96 rounded-xl border border-slate-700/50 shadow-lg" referrerPolicy="no-referrer" />
                      </div>
                    )}

                    {block.type === 'molecule' && block.molecule && (
                      <div className="my-8">
                        <h4 className="text-lg font-medium text-white mb-4">{block.molecule.name} ({block.molecule.formula})</h4>
                        <MoleculeViewer model={block.molecule} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                {moduleData.content?.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={idx} className="text-slate-300 ml-4 mb-2">{paragraph.substring(2)}</li>;
                  }
                  if (paragraph.trim() === '') return <br key={idx} />;
                  
                  // Handle inline bolding
                  const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={idx} className="text-slate-300 leading-relaxed mb-4 text-lg">
                      {parts.map((part, i) => 
                        part.startsWith('**') && part.endsWith('**') 
                          ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong> 
                          : part
                      )}
                    </p>
                  );
                })}
              </div>
            )}
            
            <div className="pt-8 border-t border-white/10 flex justify-end">
              <button 
                onClick={() => handleComplete()}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
              >
                {completed ? 'Haritaya Dön' : 'Dersi Bitir'}
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* INTERACTIVE 3D TYPE */}
        {moduleData.type === 'interactive' && moduleData.models && (
          <div className="space-y-8">
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              Aşağıdaki 3 boyutlu molekül modellerini inceleyin. Modelleri farenizle sürükleyerek döndürebilir ve yapısını yakından görebilirsiniz.
            </p>
            
            <div className="space-y-12">
              {moduleData.models.map((model, idx) => (
                <MoleculeViewer key={idx} model={model} />
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex justify-end">
              <button 
                onClick={() => handleComplete()}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
              >
                {completed ? 'Haritaya Dön' : 'İncelemeyi Bitir'}
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* MATCHING GAME TYPE */}
        {moduleData.type === 'matching' && moduleData.pairs && (
          <div className="space-y-8">
            <MatchingGame pairs={moduleData.pairs} onComplete={handleMatchingComplete} />
            
            {matchingFinished && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 border-t border-white/10 flex justify-end items-center"
              >
                <button 
                  onClick={() => handleComplete()}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
                >
                  {completed ? 'Haritaya Dön' : 'Devam Et'}
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* QUIZ TYPE */}
        {moduleData.type === 'quiz' && moduleData.questions && !quizFinished && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Soru {currentQuestion + 1} / {moduleData.questions.length}</h3>
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-400">
                  İlerleme: %{Math.round(((currentQuestion) / moduleData.questions.length) * 100)}
                </div>
              </div>
            </div>
            
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${((currentQuestion) / moduleData.questions.length) * 100}%` }}
              />
            </div>

            <div className="mb-8">
              <p className="text-xl text-white font-medium leading-relaxed">
                {moduleData.questions[currentQuestion].q}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {moduleData.questions[currentQuestion].options.map((opt, idx) => {
                let btnClass = "w-full text-left p-4 rounded-xl border transition-all ";
                
                if (!showResult) {
                  btnClass += "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-600 text-slate-200";
                } else {
                  if (idx === moduleData.questions![currentQuestion].answer) {
                    btnClass += "border-emerald-500 bg-emerald-500/20 text-emerald-400 font-medium";
                  } else if (idx === selectedAnswer) {
                    btnClass += "border-red-500 bg-red-500/20 text-red-400";
                  } else {
                    btnClass += "border-slate-800 bg-slate-900/50 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showResult && idx === moduleData.questions![currentQuestion].answer && (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center pt-6 border-t border-white/10"
              >
                <div className={`font-medium ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Tebrikler, doğru cevap!' : 'Maalesef yanlış cevap.'}
                </div>
                <button 
                  onClick={nextQuestion}
                  className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
                >
                  {currentQuestion < moduleData.questions.length - 1 ? 'Sonraki Soru' : 'Testi Bitir'}
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* QUIZ FINISHED STATE */}
        {moduleData.type === 'quiz' && quizFinished && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Test Tamamlandı!</h2>
            
            <button 
              onClick={() => handleComplete()}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] inline-flex items-center gap-2 mt-8"
            >
              {completed ? 'Haritaya Dön' : 'Devam Et'}
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
