import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurriculum } from '../../contexts/CurriculumContext';
import { ArrowLeft, Save } from 'lucide-react';
import { Theme, Module } from '../../types/curriculum';
import { MoleculeDesigner } from '../../components/admin/MoleculeDesigner';
import { ContentBlockEditor } from '../../components/admin/ContentBlockEditor';

export function ModuleEditor() {
  const { themeId, moduleId } = useParams();
  const { themes, saveTheme } = useCurriculum();
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState<Theme | null>(null);
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    const foundTheme = themes.find(t => t.id === themeId);
    if (foundTheme) {
      setTheme(foundTheme);
      const foundModule = foundTheme.modules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      }
    }
  }, [themes, themeId, moduleId]);

  if (!theme || !module) return <div className="text-slate-400 p-8">Yükleniyor...</div>;

  const handleSave = async () => {
    const updatedTheme = {
      ...theme,
      modules: theme.modules.map(m => m.id === module.id ? module : m)
    };
    await saveTheme(updatedTheme);
    alert('Modül başarıyla kaydedildi!');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/admin/theme/${theme.id}`)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold font-display text-white">Modül Düzenle</h1>
            <p className="text-slate-400">{theme.title} / {module.title}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Genel Ayarlar</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Başlık</label>
            <input 
              type="text" 
              value={module.title}
              onChange={(e) => setModule({...module, title: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Açıklama</label>
          <input 
            type="text" 
            value={module.description}
            onChange={(e) => setModule({...module, description: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Content Editor based on type */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">İçerik Düzenleyici ({module.type})</h3>
        
        {module.type === 'lesson' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-white">Konu Anlatımı İçeriği</h4>
            </div>
            <ContentBlockEditor 
              blocks={module.blocks || []} 
              onChange={(newBlocks) => setModule({...module, blocks: newBlocks})} 
            />
          </div>
        )}

        {module.type === 'quiz' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-white">Test Soruları</h4>
              <button 
                onClick={() => setModule({
                  ...module, 
                  questions: [...(module.questions || []), { id: crypto.randomUUID(), q: '', options: ['', '', '', ''], answer: 0 }]
                })}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 text-sm font-medium"
              >
                + Soru Ekle
              </button>
            </div>
            
            <div className="space-y-6">
              {(module.questions || []).map((question, qIdx) => (
                <div key={question.id || qIdx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-400 mb-1">Soru Metni</label>
                      <textarea 
                        value={question.q}
                        onChange={(e) => {
                          const newQs = [...(module.questions || [])];
                          newQs[qIdx].q = e.target.value;
                          setModule({...module, questions: newQs});
                        }}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 resize-none"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const newQs = [...(module.questions || [])];
                        newQs.splice(qIdx, 1);
                        setModule({...module, questions: newQs});
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg"
                    >
                      Sil
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Şıklar ve Doğru Cevap</label>
                    <div className="space-y-2">
                      {question.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name={`q-${qIdx}-answer`}
                            checked={question.answer === optIdx}
                            onChange={() => {
                              const newQs = [...(module.questions || [])];
                              newQs[qIdx].answer = optIdx;
                              setModule({...module, questions: newQs});
                            }}
                            className="w-4 h-4 text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500"
                          />
                          <input 
                            type="text" 
                            value={opt}
                            onChange={(e) => {
                              const newQs = [...(module.questions || [])];
                              newQs[qIdx].options[optIdx] = e.target.value;
                              setModule({...module, questions: newQs});
                            }}
                            placeholder={`${String.fromCharCode(65 + optIdx)} Şıkkı`}
                            className={`flex-1 bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 ${
                              question.answer === optIdx ? 'border-emerald-500/50' : 'border-slate-700'
                            }`}
                          />
                          <button
                            onClick={() => {
                              const newQs = [...(module.questions || [])];
                              newQs[qIdx].options.splice(optIdx, 1);
                              if (newQs[qIdx].answer >= newQs[qIdx].options.length) {
                                newQs[qIdx].answer = Math.max(0, newQs[qIdx].options.length - 1);
                              }
                              setModule({...module, questions: newQs});
                            }}
                            className="p-2 text-slate-500 hover:text-red-400"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        const newQs = [...(module.questions || [])];
                        newQs[qIdx].options.push('');
                        setModule({...module, questions: newQs});
                      }}
                      className="mt-2 text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      + Şık Ekle
                    </button>
                  </div>
                </div>
              ))}
              {(!module.questions || module.questions.length === 0) && (
                <div className="text-center py-8 text-slate-500">
                  Henüz soru eklenmemiş.
                </div>
              )}
            </div>
          </div>
        )}

        {module.type === 'interactive' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-white">3D Molekül Modelleri</h4>
              <button 
                onClick={() => setModule({
                  ...module, 
                  models: [...(module.models || []), { name: 'Yeni Molekül', formula: 'X', atoms: [], bonds: [] }]
                })}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 text-sm font-medium"
              >
                + Model Ekle
              </button>
            </div>
            
            <div className="space-y-12">
              {(module.models || []).map((model, idx) => (
                <div key={idx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <h5 className="text-white font-medium">Model {idx + 1}</h5>
                    <button 
                      onClick={() => {
                        const newModels = [...(module.models || [])];
                        newModels.splice(idx, 1);
                        setModule({...module, models: newModels});
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg"
                    >
                      Modeli Sil
                    </button>
                  </div>
                  <MoleculeDesigner 
                    model={model} 
                    onChange={(updatedModel) => {
                      const newModels = [...(module.models || [])];
                      newModels[idx] = updatedModel;
                      setModule({...module, models: newModels});
                    }} 
                  />
                </div>
              ))}
              {(!module.models || module.models.length === 0) && (
                <div className="text-center py-8 text-slate-500">
                  Henüz model eklenmemiş.
                </div>
              )}
            </div>
          </div>
        )}

        {module.type === 'matching' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-white">Eşleştirme Çiftleri</h4>
              <button 
                onClick={() => setModule({...module, pairs: [...(module.pairs || []), { left: '', right: '' }]})}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 text-sm font-medium"
              >
                + Çift Ekle
              </button>
            </div>
            
            <div className="space-y-4">
              {(module.pairs || []).map((pair, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex-1 space-y-2">
                    <input 
                      type="text" 
                      value={pair.left}
                      onChange={(e) => {
                        const newPairs = [...(module.pairs || [])];
                        newPairs[idx].left = e.target.value;
                        setModule({...module, pairs: newPairs});
                      }}
                      placeholder="Sol Taraf (Kavram)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <textarea 
                      value={pair.right}
                      onChange={(e) => {
                        const newPairs = [...(module.pairs || [])];
                        newPairs[idx].right = e.target.value;
                        setModule({...module, pairs: newPairs});
                      }}
                      placeholder="Sağ Taraf (Açıklama)"
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      const newPairs = [...(module.pairs || [])];
                      newPairs.splice(idx, 1);
                      setModule({...module, pairs: newPairs});
                    }}
                    className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg mt-1"
                  >
                    Sil
                  </button>
                </div>
              ))}
              {(!module.pairs || module.pairs.length === 0) && (
                <div className="text-center py-8 text-slate-500">
                  Henüz eşleştirme çifti eklenmemiş.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
