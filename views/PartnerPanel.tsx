
import React, { useState } from 'react';
import { MOCK_COURTS } from '../mockData';
import { formatCurrency } from '../utils/validation';

const PartnerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'dashboard' | 'agenda'>('dashboard');

  const stats = [
    { label: 'Ganhos Totais (Antecipado)', value: formatCurrency(2450.50), color: 'bg-green-100 text-green-700' },
    { label: 'Reservas do Mês', value: '42', color: 'bg-blue-100 text-blue-700' },
    { label: 'Taxa de Ocupação', value: '78%', color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Painel do Parceiro</h1>
          <p className="text-gray-500">Gerencie seu estabelecimento e acompanhe seus lucros.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Cadastrar Nova Quadra
        </button>
      </div>

      <div className="flex gap-4 border-b pb-1 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 font-bold transition whitespace-nowrap ${activeTab === 'dashboard' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          Resumo Financeiro
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 font-bold transition whitespace-nowrap ${activeTab === 'inventory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          Minhas Quadras
        </button>
        <button 
          onClick={() => setActiveTab('agenda')}
          className={`px-4 py-2 font-bold transition whitespace-nowrap ${activeTab === 'agenda' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          Agenda
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white p-6 rounded-3xl border shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${stat.color.split(' ')[0].replace('100', '500')} w-2/3`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Últimas Reservas Confirmadas</h3>
              <button className="text-indigo-600 font-bold text-sm">Ver tudo</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Quadra</th>
                    <th className="px-6 py-4">Data/Hora</th>
                    <th className="px-6 py-4 text-right">Valor Antecipado</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium">João da Silva</td>
                      <td className="px-6 py-4 text-gray-600">Quadra Society 1</td>
                      <td className="px-6 py-4 text-gray-600">22/05/2024 às 19:00</td>
                      <td className="px-6 py-4 text-right font-bold text-green-600">{formatCurrency(90.00)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
          {MOCK_COURTS.slice(0, 2).map(court => (
            <div key={court.id} className="bg-white p-6 rounded-3xl border shadow-sm flex gap-6 items-center">
              <img src={court.image} alt={court.name} className="w-32 h-32 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{court.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{court.sport}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-600">{formatCurrency(court.pricePerHour)}/h</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                    <button className="p-2 bg-red-50 rounded-lg hover:bg-red-100"><svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'agenda' && (
        <div className="bg-white rounded-3xl border shadow-sm p-12 text-center">
           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
           </div>
           <h3 className="font-bold text-xl mb-2">Calendário de Reservas</h3>
           <p className="text-gray-500 max-w-sm mx-auto">Em breve: visualize todos os seus horários ocupados e disponíveis de forma interativa.</p>
        </div>
      )}
    </div>
  );
};

export default PartnerPanel;
