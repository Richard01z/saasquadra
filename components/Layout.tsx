
import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  setView: (view: ViewState) => void;
  isLoggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, isLoggedIn }) => {
  // ADMIN ID para liberar área de parceiro
  const ADMIN_EMAIL = 'iorichardcontato@gmail.com';
  const isAdmin = isLoggedIn && window.localStorage.getItem('userEmail') === ADMIN_EMAIL;

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
          <span className="text-xl font-bold tracking-tight">ArenaReserve</span>
        </div>
        <nav className="flex items-center gap-8 font-medium">
          <button onClick={() => setView('home')} className={activeView === 'home' ? 'text-indigo-600' : 'text-gray-600'}>Início</button>
          {isAdmin && (
            <button onClick={() => setView('partner-admin')} className={activeView === 'partner-admin' ? 'text-indigo-600' : 'text-gray-600'}>Painel Parceiro</button>
          )}
          {isLoggedIn ? (
             <button onClick={() => setView('profile')} className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300"></button>
          ) : (
             <button onClick={() => setView('auth')} className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">Entrar</button>
          )}
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden px-4 py-4 bg-white border-b flex justify-between items-center sticky top-0 z-50">
        <span className="text-lg font-bold">ArenaReserve</span>
        <button onClick={() => setView('auth')} className="text-sm font-medium text-indigo-600">Entrar</button>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 px-2 z-50">
        <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="text-xs">Explorar</span>
        </button>
        {isAdmin && (
          <button onClick={() => setView('partner-admin')} className={`flex flex-col items-center gap-1 ${activeView === 'partner-admin' ? 'text-indigo-600' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <span className="text-xs">Negócios</span>
          </button>
        )}
        <button onClick={() => setView('profile')} className={`flex flex-col items-center gap-1 ${activeView === 'profile' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span className="text-xs">Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
