
import React, { useState } from 'react';
import { MOCK_COURTS } from '../mockData';
import { formatCurrency } from '../utils/validation';

const PartnerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'dashboard' | 'agenda'>('dashboard');
  const [editImageId, setEditImageId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [editCourtId, setEditCourtId] = useState<string | null>(null);
  const [editCourtPrice, setEditCourtPrice] = useState('');
  const [editCourtTimes, setEditCourtTimes] = useState('');
  const [courts, setCourts] = useState(
    [...MOCK_COURTS].map(c => ({ ...c, availableTimes: ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','18:00','19:00','20:00','21:00','22:00'] }))
  );

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
          {courts.map(court => (
            <div key={court.id} className="bg-white p-6 rounded-3xl border shadow-sm flex gap-6 items-center">
              <div className="relative">
                <img src={court.image} alt={court.name} className="w-32 h-32 rounded-2xl object-cover" />
                <button
                  className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded hover:bg-indigo-700 transition"
                  onClick={() => { setEditImageId(court.id); setImageUrl(court.image); }}
                >Trocar imagem</button>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{court.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{court.sport}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-600">{formatCurrency(court.pricePerHour)}/h</span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200"
                      title="Editar valores e horários"
                      onClick={() => {
                        setEditCourtId(court.id);
                        setEditCourtPrice(String(court.pricePerHour));
                        setEditCourtTimes((court.availableTimes || []).join(", "));
                      }}
                    >
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Horários: {(court.availableTimes || []).join(', ')}</div>
              </div>
            </div>
          ))}
          {editCourtId && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold mb-2">Editar valores e horários</h2>
                <label className="block text-sm font-bold text-gray-700 mb-1">Valor da hora (R$)</label>
                <input
                  type="number"
                  className="w-full p-3 rounded-xl border bg-gray-100 text-gray-800 mb-2"
                  value={editCourtPrice}
                  onChange={e => setEditCourtPrice(e.target.value)}
                />
                <label className="block text-sm font-bold text-gray-700 mb-1">Horários disponíveis (separados por vírgula)</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border bg-gray-100 text-gray-800 mb-2"
                  value={editCourtTimes}
                  onChange={e => setEditCourtTimes(e.target.value)}
                  placeholder="08:00, 09:00, 10:00, ..."
                />
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 py-3 rounded-2xl font-bold shadow transition bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={() => {
                      setCourts(prev => prev.map(c => c.id === editCourtId ? {
                        ...c,
                        pricePerHour: Number(editCourtPrice),
                        availableTimes: editCourtTimes.split(',').map(t => t.trim()).filter(Boolean)
                      } : c));
                      setEditCourtId(null);
                    }}
                  >Salvar</button>
                  <button
                    className="flex-1 py-3 rounded-2xl font-bold shadow transition bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => setEditCourtId(null)}
                  >Cancelar</button>
                </div>
              </div>
            </div>
          )}
          {editImageId && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold mb-2">Trocar imagem da quadra</h2>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border bg-gray-100 text-gray-800"
                  placeholder="Cole a URL da nova imagem"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                />
                <img src={imageUrl} alt="Pré-visualização" className="w-full h-40 object-cover rounded-xl border" />
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 py-3 rounded-2xl font-bold shadow transition bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={() => {
                      setCourts(prev => prev.map(c => c.id === editImageId ? { ...c, image: imageUrl } : c));
                      setEditImageId(null);
                    }}
                  >Salvar</button>
                  <button
                    className="flex-1 py-3 rounded-2xl font-bold shadow transition bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => setEditImageId(null)}
                  >Cancelar</button>
                </div>
              </div>
            </div>
          )}
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
