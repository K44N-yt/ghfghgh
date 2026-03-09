import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurriculum } from '../../contexts/CurriculumContext';
import { ArrowLeft, Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Theme, Module } from '../../types/curriculum';

export function ThemeEditor() {
  const { themeId } = useParams();
  const { themes, saveTheme } = useCurriculum();
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');
  const [newModuleType, setNewModuleType] = useState<'lesson' | 'quiz' | 'interactive' | 'matching'>('lesson');

  useEffect(() => {
    const found = themes.find(t => t.id === themeId);
    if (found) {
      setTheme(found);
    }
  }, [themes, themeId]);

  if (!theme) return <div className="text-slate-400 p-8">Yükleniyor...</div>;

  const handleSaveThemeDetails = async () => {
    await saveTheme(theme);
    alert('Tema güncellendi');
  };

  const handleAddModule = async () => {
    if (!newModuleTitle.trim()) return;
    
    const newModule: Module = {
      id: uuidv4(),
      title: newModuleTitle,
      description: newModuleDesc,
      type: newModuleType,
      blocks: [],
      questions: [],
      models: [],
      pairs: []
    };
    
    const updatedTheme = {
      ...theme,
      modules: [...theme.modules, newModule]
    };
    
    await saveTheme(updatedTheme);
    setIsAddingModule(false);
    setNewModuleTitle('');
    setNewModuleDesc('');
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (window.confirm('Bu modülü silmek istediğinize emin misiniz?')) {
      const updatedTheme = {
        ...theme,
        modules: theme.modules.filter(m => m.id !== moduleId)
      };
      await saveTheme(updatedTheme);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin')}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold font-display text-white">Tema Düzenle</h1>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Tema Detayları</h3>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Başlık</label>
          <input 
            type="text" 
            value={theme.title}
            onChange={(e) => setTheme({...theme, title: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Açıklama</label>
          <input 
            type="text" 
            value={theme.description}
            onChange={(e) => setTheme({...theme, description: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSaveThemeDetails}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium"
          >
            Detayları Kaydet
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-12">
        <h2 className="text-2xl font-bold text-white">Modüller</h2>
        <button 
          onClick={() => setIsAddingModule(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Modül Ekle
        </button>
      </div>

      {isAddingModule && (
        <div className="glass-card p-6 border-emerald-500/30 space-y-4">
          <h3 className="text-lg font-semibold text-white">Yeni Modül</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Başlık</label>
              <input 
                type="text" 
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tür</label>
              <select 
                value={newModuleType}
                onChange={(e) => setNewModuleType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="lesson">Konu Anlatımı (Lesson)</option>
                <option value="quiz">Test (Quiz)</option>
                <option value="interactive">3D İnteraktif</option>
                <option value="matching">Eşleştirme Oyunu</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Açıklama</label>
            <input 
              type="text" 
              value={newModuleDesc}
              onChange={(e) => setNewModuleDesc(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              onClick={() => setIsAddingModule(false)}
              className="px-4 py-2 text-slate-400 hover:text-white"
            >
              İptal
            </button>
            <button 
              onClick={handleAddModule}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
            >
              Ekle
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {theme.modules.map((mod) => (
          <div key={mod.id} className="glass-card p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <GripVertical className="w-5 h-5 text-slate-600 cursor-grab" />
              <div>
                <h3 className="text-lg font-semibold text-white">{mod.title}</h3>
                <p className="text-sm text-slate-400">{mod.description}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-slate-800 rounded text-cyan-400 uppercase">{mod.type}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => navigate(`/admin/theme/${theme.id}/module/${mod.id}`)}
                className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-800 rounded-lg"
                title="İçeriği Düzenle"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteModule(mod.id)}
                className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg"
                title="Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {theme.modules.length === 0 && !isAddingModule && (
          <div className="text-center py-12 text-slate-500">
            Bu temada henüz modül yok.
          </div>
        )}
      </div>
    </div>
  );
}
