
import React, { useState } from 'react';
import { MOCK_COURTS, MOCK_VENUES } from '../mockData';
import { Court, SportType, Venue } from '../types';
import CourtCard from '../components/CourtCard';

interface CustomerHomeProps {
  onSelectCourt: (court: Court) => void;
}

const SPORTS: SportType[] = ['Futebol', 'Beach Tennis', 'Tênis', 'Basquete', 'Vôlei', 'Padel'];

const CustomerHome: React.FC<CustomerHomeProps> = ({ onSelectCourt }) => {
  const [selectedSport, setSelectedSport] = useState<SportType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourts = MOCK_COURTS.filter(court => {
    const matchesSport = selectedSport === 'All' || court.sport === selectedSport;
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          court.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Hero / Search */}
      <section className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Sua próxima partida começa aqui.</h1>
          <p className="text-indigo-100 text-lg mb-8">Reserve as melhores quadras da cidade em segundos. Pagamento facilitado e garantia de horário.</p>
          <div className="flex bg-white rounded-2xl p-2 items-center shadow-lg">
            <svg className="w-6 h-6 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="O que você quer jogar?" 
              className="flex-1 px-4 py-3 text-gray-800 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="hidden md:block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Buscar</button>
          </div>
        </div>
        <div className="absolute right-[-10%] bottom-[-10%] opacity-20 hidden lg:block">
           <svg className="w-96 h-96" viewBox="0 0 200 200" fill="currentColor"><path d="M44.5,-76.3C58.4,-69.1,70.9,-58.5,79.1,-45.3C87.4,-32.1,91.3,-16,90.4,-0.5C89.5,15,83.7,29.9,74.9,42.8C66.1,55.7,54.2,66.6,40.6,73.5C27,80.4,11.5,83.3,-3.1,88.7C-17.7,94.1,-35.4,102.1,-49.8,96.8C-64.2,91.5,-75.4,72.9,-82.7,55.4C-90,37.9,-93.3,21.5,-92.4,5.4C-91.5,-10.7,-86.3,-26.6,-77.9,-40.3C-69.5,-54,-57.8,-65.4,-44.2,-72.9C-30.6,-80.4,-15.3,-84,0.1,-84.1C15.4,-84.3,30.7,-83.5,44.5,-76.3Z" transform="translate(100 100)" /></svg>
        </div>
      </section>

      {/* Sport Filters */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        <button 
          onClick={() => setSelectedSport('All')}
          className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${selectedSport === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Todos
        </button>
        {SPORTS.map(sport => (
          <button 
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${selectedSport === sport ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourts.map(court => {
          const venue = MOCK_VENUES.find((v: Venue) => v.id === court.venueId);
          return (
            <CourtCard key={court.id} court={court} venue={venue} onSelect={onSelectCourt} />
          );
        })}
      </div>
      
      {filteredCourts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400 text-lg">Nenhuma quadra encontrada para os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
