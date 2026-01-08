
import React, { useState } from 'react';
import ReservationReceipt from '../components/ReservationReceipt';
import { Court, Reservation, Venue } from '../types';
import { MOCK_VENUES } from '../mockData';
import { formatCurrency } from '../utils/validation';

interface CourtBookingProps {
  court: Court;
  onConfirm: (reservation: Reservation) => void;
  onBack: () => void;
}

const CourtBooking: React.FC<CourtBookingProps> = ({ court, onConfirm, onBack }) => {
  const venue = MOCK_VENUES.find(v => v.id === court.venueId);
  const [selectedDate, setSelectedDate] = useState('2024-05-20');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const availableTimes = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  const totalValue = court.pricePerHour;
  const prepayValue = totalValue * 0.5;
  const remainingValue = totalValue - prepayValue;

  const handleBooking = async () => {
    if (!selectedTime) return;
    setIsProcessing(true);
    
    // Simulate payment API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      courtId: court.id,
      userId: 'u1',
      date: selectedDate,
      time: selectedTime,
      totalValue,
      paidValue: prepayValue,
      remainingValue,
      status: 'confirmed',
      venueName: venue?.name || '',
      courtName: court.name
    };
    
    setConfirmedReservation(reservation);
    setShowReceipt(true);
    setIsProcessing(false);
  };

  if (showReceipt && confirmedReservation) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border">
        <div className="bg-green-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-bold">Reserva Confirmada!</h2>
          <p className="opacity-90">Pagamento antecipado realizado com sucesso.</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="border-b pb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Resumo da Reserva</p>
            <h3 className="font-bold text-xl">{confirmedReservation.courtName}</h3>
            <p className="text-gray-600">{confirmedReservation.venueName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">DATA</p>
              <p className="font-semibold">{confirmedReservation.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">HORÁRIO</p>
              <p className="font-semibold">{confirmedReservation.time}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Valor Total</span>
              <span className="font-semibold">{formatCurrency(confirmedReservation.totalValue)}</span>
            </div>
            <div className="flex justify-between text-indigo-600 font-bold">
              <span>Pago Antecipado (50%)</span>
              <span>{formatCurrency(confirmedReservation.paidValue)}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span className="text-gray-600">Saldo a Pagar no Local</span>
              <span className="font-bold text-gray-900">{formatCurrency(confirmedReservation.remainingValue)}</span>
            </div>
          </div>

          <div className="pt-4 text-center">
            <p className="text-xs text-gray-400 mb-6 italic">Apresente este comprovante no balcão de atendimento do estabelecimento.</p>
            <button 
              onClick={() => onBack()}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
            >
              Voltar para Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Column: Info */}
      <div className="space-y-6">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 font-medium hover:underline">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar para busca
        </button>
        
        <div className="rounded-3xl overflow-hidden shadow-sm aspect-video">
          <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{court.name}</h1>
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">{court.sport}</span>
             <span className="text-gray-400">•</span>
             <span className="text-gray-600 font-medium">{venue?.name}</span>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">{court.description}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Localização
          </h3>
          <p className="text-gray-600">{venue?.address}</p>
        </div>
      </div>

      {/* Right Column: Scheduling */}
      <div className="bg-white p-8 rounded-3xl border shadow-xl h-fit sticky top-24">
        <h2 className="text-2xl font-bold mb-6">Agendar Horário</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Data da Partida</label>
            <input 
              type="date" 
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border focus:ring-2 focus:ring-indigo-500 outline-none"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Horários Disponíveis</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl font-medium transition ${selectedTime === time ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-700 border hover:bg-gray-100'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">Política de Pagamento</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-indigo-700">Valor da Locação (1h)</span>
                <span className="font-bold">{formatCurrency(totalValue)}</span>
              </div>
              <div className="flex justify-between font-bold text-indigo-900 text-base pt-2 border-t border-indigo-200">
                <span>Reserva Antecipada (50%)</span>
                <span>{formatCurrency(prepayValue)}</span>
              </div>
              <p className="text-xs text-indigo-600/80 mt-2">Os 50% restantes deverão ser pagos diretamente ao estabelecimento no check-in.</p>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedTime || isProcessing}
            className={`w-full py-4 rounded-2xl font-bold shadow-xl transition flex items-center justify-center gap-3 ${!selectedTime ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            {isProcessing ? (
              <span>Processando...</span>
            ) : (
              <span>Confirmar Reserva</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourtBooking;
