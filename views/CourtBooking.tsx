function formatDateBR(dateStr: string) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

import React, { useState } from 'react';
import ReservationReceipt from '../components/ReservationReceipt';
import { Court, Reservation, Venue } from '../types';
import { MOCK_VENUES } from '../mockData';
import { formatCurrency } from '../utils/validation';

interface CourtBookingProps {
  court: Court;
  onConfirm: (reservation: Reservation) => void;
  onBack: () => void;
  reservations?: Reservation[];
}

const CourtBooking: React.FC<CourtBookingProps> = ({ court, onConfirm, onBack, reservations = [] }) => {
  const venue = MOCK_VENUES.find(v => v.id === court.venueId);
  const [selectedDate, setSelectedDate] = useState('2024-05-20');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPixQR, setShowPixQR] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const availableTimes = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  // Horários reservados para a data selecionada
  const reservedTimes = reservations
    .filter(r => r.date === selectedDate)
    .map(r => r.time);

  const totalValue = court.pricePerHour;
  const prepayValue = totalValue * 0.5;
  const remainingValue = totalValue - prepayValue;

  const handleBooking = () => {
    if (!selectedTime) return;
    setShowPayment(true);
    setShowPixQR(false);
  };

  const handlePayment = () => {
    setShowPixQR(true);
  };

  const handlePixConfirm = async () => {
    setIsProcessing(true);
    // Simula confirmação do pagamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    const reservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      courtId: court.id,
      userId: 'u1',
      date: selectedDate,
      time: selectedTime!,
      totalValue,
      paidValue: prepayValue,
      remainingValue,
      status: 'confirmed',
      venueName: venue?.name || '',
      courtName: court.name
    };
    setConfirmedReservation(reservation);
    setShowReceipt(true);
    setShowPayment(false);
    setShowPixQR(false);
    setIsProcessing(false);
    setSelectedTime(null);
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
              <p className="font-semibold">{formatDateBR(confirmedReservation.date)}</p>
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

  if (showPayment) {
    if (showPixQR) {
      return (
        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border mt-12">
          <div className="bg-green-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path></svg>
            </div>
            <h2 className="text-2xl font-bold">Pagamento via Pix</h2>
            <p className="opacity-90">Escaneie o QR Code abaixo para pagar 50% do valor da reserva.</p>
          </div>
          <div className="p-8 space-y-6 flex flex-col items-center">
            <div className="bg-white p-4 rounded-2xl border shadow flex flex-col items-center">
              {/* QR Code fake para simulação */}
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PagamentoPixSimulado" alt="QR Code Pix" className="w-40 h-40 mb-4" />
              <span className="text-gray-700 text-sm">Valor: <b>{formatCurrency(prepayValue)}</b></span>
            </div>
            <button
              onClick={handlePixConfirm}
              disabled={isProcessing}
              className={`w-full py-4 rounded-2xl font-bold shadow-xl transition flex items-center justify-center gap-3 bg-indigo-600 text-white hover:bg-indigo-700 ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Confirmando...' : 'Já paguei'}
            </button>
            <button
              onClick={() => setShowPixQR(false)}
              className="w-full py-3 rounded-2xl font-bold shadow transition bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Voltar
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border mt-12">
        <div className="bg-indigo-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path></svg>
          </div>
          <h2 className="text-2xl font-bold">Pagamento Antecipado</h2>
          <p className="opacity-90">Confirme o pagamento para finalizar a reserva.</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Valor Total</span>
              <span className="font-semibold">{formatCurrency(totalValue)}</span>
            </div>
            <div className="flex justify-between text-indigo-600 font-bold">
              <span>Reserva Antecipada (50%)</span>
              <span>{formatCurrency(prepayValue)}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span className="text-gray-600">Saldo a Pagar no Local</span>
              <span className="font-bold text-gray-900">{formatCurrency(remainingValue)}</span>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-2xl font-bold shadow-xl transition flex items-center justify-center gap-3 bg-green-600 text-white hover:bg-green-700 ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              Pagar com Pix
            </button>
            <button
              onClick={() => { setShowManual(true); setShowPayment(false); }}
              className="w-full py-3 rounded-2xl font-bold shadow transition bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              Reservar direto com o atendente
            </button>
            <button
              onClick={() => setShowPayment(false)}
              className="w-full py-3 rounded-2xl font-bold shadow transition bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showManual) {
    const msg = `Olá! Gostaria de reservar a quadra "${court.name}" no dia ${formatDateBR(selectedDate)} às ${selectedTime}.`;
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border mt-12">
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </div>
          <h2 className="text-2xl font-bold">Reserva Manual</h2>
          <p className="opacity-90">Fale direto com o atendente para reservar.</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-gray-700 mb-2">Envie a mensagem abaixo para o WhatsApp ou telefone do estabelecimento:</p>
            <textarea className="w-full p-3 rounded-xl border bg-gray-100 text-gray-800" rows={3} readOnly value={msg} />
            <div className="mt-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="w-full block bg-green-600 text-white py-3 rounded-2xl font-bold text-center shadow hover:bg-green-700 transition mb-2">Enviar pelo WhatsApp</a>
              <button onClick={() => setShowManual(false)} className="w-full py-3 rounded-2xl font-bold shadow transition bg-gray-200 text-gray-700 hover:bg-gray-300">Voltar</button>
            </div>
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
              {availableTimes.map(time => {
                const isReserved = reservedTimes.includes(time);
                const isSelected = selectedTime === time;
                let colorClass = '';
                if (isReserved) {
                  colorClass = 'bg-red-500 text-white opacity-70 cursor-not-allowed line-through';
                } else if (isSelected) {
                  colorClass = 'bg-indigo-600 text-white shadow-lg';
                } else {
                  colorClass = 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200';
                }
                return (
                  <button
                    key={time}
                    onClick={() => !isReserved && setSelectedTime(time)}
                    disabled={isReserved}
                    className={`py-3 rounded-xl font-medium transition ${colorClass}`}
                  >
                    {time}
                  </button>
                );
              })}
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
            <span>Avançar para pagamento</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourtBooking;
