import { Atom } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Atom className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold font-display text-white">Kimya Dünyası</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              10. sınıf kimya öğrencileri için Maarif Müfredatına uygun, etkileşimli ve yapay zeka destekli modern eğitim platformu.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Konular</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Sanal Laboratuvar</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Oyunlar</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Liderlik Tablosu</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Destek</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Sıkça Sorulan Sorular</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Yapay Zeka Asistanı</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">İletişim</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 Kimya Dünyası. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
