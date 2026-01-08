
export type SportType = 'Futebol' | 'Tênis' | 'Beach Tennis' | 'Vôlei' | 'Basquete' | 'Padel';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  role: 'customer' | 'partner';
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  partnerId: string;
}

export interface Court {
  id: string;
  venueId: string;
  name: string;
  sport: SportType;
  pricePerHour: number;
  image: string;
  description: string;
}

export interface Reservation {
  id: string;
  courtId: string;
  userId: string;
  date: string;
  time: string;
  totalValue: number;
  paidValue: number;
  remainingValue: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  venueName: string;
  courtName: string;
}

export type ViewState = 'home' | 'booking' | 'partner-admin' | 'profile' | 'auth';
