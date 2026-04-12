import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedBackground } from './AnimatedBackground';
import { Atom, LayoutDashboard, Map, LogOut, User, ShieldAlert } from 'lucide-react';

export function MainLayout() {
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Panel' },
    { path: '/map', icon: Map, label: 'İlerleme Haritası' },
  ];

  return (
    <div className="min-h-screen font-sans text-slate-50 flex">
      <AnimatedBackground />
      
      {/* Sidebar */}
      <aside className="w-64 glass-card rounded-none border-y-0 border-l-0 border-r-white/10 flex flex-col fixed h-full z-40">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Atom className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-white">ReaksiyonLab</span>
        </div>

        <div className="p-6 flex-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menü</div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-white truncate">{userProfile?.displayName}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 relative z-10 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
