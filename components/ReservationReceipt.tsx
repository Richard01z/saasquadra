function formatDateBR(dateStr: string) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}
import React from 'react';
import { Reservation } from '../types';
import { formatCurrency } from '../utils/validation';

interface ReservationReceiptProps {
  reservation: Reservation;
  onBack: () => void;
}

const ReservationReceipt: React.FC<ReservationReceiptProps> = ({ reservation, onBack }) => (
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
        <h3 className="font-bold text-xl">{reservation.courtName}</h3>
        <p className="text-gray-600">{reservation.venueName}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">DATA</p>
          <p className="font-semibold">{formatDateBR(reservation.date)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">HORÁRIO</p>
          <p className="font-semibold">{reservation.time}</p>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Valor Total</span>
          <span className="font-semibold">{formatCurrency(reservation.totalValue)}</span>
        </div>
        <div className="flex justify-between text-indigo-600 font-bold">
          <span>Pago Antecipado (50%)</span>
          <span>{formatCurrency(reservation.paidValue)}</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
          <span className="text-gray-600">Saldo a Pagar no Local</span>
          <span className="font-bold text-gray-900">{formatCurrency(reservation.remainingValue)}</span>
        </div>
      </div>
      <div className="pt-4 text-center">
        <p className="text-xs text-gray-400 mb-6 italic">Apresente este comprovante no balcão de atendimento do estabelecimento.</p>
        <button 
          onClick={onBack}
          className="w-full bg-black text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
        >
          Voltar para Início
        </button>
      </div>
    </div>
  </div>
);

export default ReservationReceipt;
