import React from 'react';
import { Court, Venue } from '../types';
import { formatCurrency } from '../utils/validation';

interface CourtCardProps {
  court: Court;
  venue?: Venue;
  onSelect: (court: Court) => void;
}

const CourtCard: React.FC<CourtCardProps> = ({ court, venue, onSelect }) => (
  <div 
    className="group cursor-pointer"
    onClick={() => onSelect(court)}
  >
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-3 shadow-sm border bg-gray-100">
      <img 
        src={court.image} 
        alt={court.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600">
        {court.sport}
      </div>
    </div>
    <div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-900 leading-tight">{court.name}</h3>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <span className="text-sm font-semibold">{venue?.rating}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-1">{venue?.name}</p>
      <div className="mt-2">
        <span className="font-bold text-lg">{formatCurrency(court.pricePerHour)}</span>
        <span className="text-gray-500 text-sm"> /hora</span>
      </div>
    </div>
  </div>
);

export default CourtCard;
