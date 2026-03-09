import { useState } from 'react';
import { useCurriculum } from '../../contexts/CurriculumContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Theme } from '../../types/curriculum';

export function AdminDashboard() {
  const { themes, saveTheme, deleteTheme } = useCurriculum();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newThemeTitle, setNewThemeTitle] = useState('');
  const [newThemeDesc, setNewThemeDesc] = useState('');

  const handleAddTheme = async () => {
    if (!newThemeTitle.trim()) return;
    
    const newTheme: Theme = {
      id: uuidv4(),
      title: newThemeTitle,
      description: newThemeDesc,
      modules: [],
      order: themes.length
    };
    
    await saveTheme(newTheme);
    setIsAdding(false);
    setNewThemeTitle('');
    setNewThemeDesc('');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu temayı silmek istediğinize emin misiniz? İçindeki tüm modüller silinecektir.')) {
      await deleteTheme(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Müfredat temalarını yönetin.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yeni Tema Ekle
        </button>
      </div>

      {isAdding && (
        <div className="glass-card p-6 border-cyan-500/30 space-y-4">
          <h3 className="text-lg font-semibold text-white">Yeni Tema</h3>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Başlık</label>
            <input 
              type="text" 
              value={newThemeTitle}
              onChange={(e) => setNewThemeTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              placeholder="Örn: 1. TEMA: ETKİLEŞİM"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Açıklama</label>
            <input 
              type="text" 
              value={newThemeDesc}
              onChange={(e) => setNewThemeDesc(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              placeholder="Kısa açıklama..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-slate-400 hover:text-white"
            >
              İptal
            </button>
            <button 
              onClick={handleAddTheme}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium"
            >
              Kaydet
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {themes.map((theme) => (
          <div key={theme.id} className="glass-card p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <GripVertical className="w-5 h-5 text-slate-600 cursor-grab" />
              <div>
                <h3 className="text-lg font-semibold text-white">{theme.title}</h3>
                <p className="text-sm text-slate-400">{theme.description}</p>
                <div className="text-xs text-cyan-400 mt-1">{theme.modules.length} Modül</div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => navigate(`/admin/theme/${theme.id}`)}
                className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-800 rounded-lg"
                title="Düzenle"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(theme.id)}
                className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg"
                title="Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {themes.length === 0 && !isAdding && (
          <div className="text-center py-12 text-slate-500">
            Henüz hiç tema eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
}
