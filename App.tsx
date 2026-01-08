
import React, { useState } from 'react';
import Layout from './components/Layout';
import CustomerHome from './views/CustomerHome';
import CourtBooking from './views/CourtBooking';
import PartnerPanel from './views/PartnerPanel';
import Auth from './views/Auth';
import { ViewState, Court, Reservation } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleSelectCourt = (court: Court) => {
    setSelectedCourt(court);
    setView('booking');
  };

  const handleConfirmReservation = (res: Reservation) => {
    setReservations(prev => [...prev, res]);
    // The view switching is handled inside CourtBooking for the receipt
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <CustomerHome onSelectCourt={handleSelectCourt} />;
      case 'booking':
        return selectedCourt ? (
          <CourtBooking 
            court={selectedCourt} 
            onConfirm={handleConfirmReservation}
            onBack={() => setView('home')} 
          />
        ) : <CustomerHome onSelectCourt={handleSelectCourt} />;
      case 'partner-admin':
        return <PartnerPanel />;
      case 'auth':
        return <Auth onSuccess={handleAuthSuccess} />;
      case 'profile':
        return (
          <div className="py-12 text-center space-y-4">
             <h1 className="text-2xl font-bold">Meu Perfil</h1>
             <p className="text-gray-500">Suas reservas aparecerão aqui em breve.</p>
             <button onClick={() => setIsLoggedIn(false)} className="text-red-500 font-bold underline">Sair da conta</button>
          </div>
        );
      default:
        return <CustomerHome onSelectCourt={handleSelectCourt} />;
    }
  };

  return (
    <Layout activeView={view} setView={setView} isLoggedIn={isLoggedIn}>
      {renderContent()}
    </Layout>
  );
};

export default App;
