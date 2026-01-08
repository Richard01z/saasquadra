
import { Court, Venue } from './types';

export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Arena Central Sports',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1554062614-6da466ce1781?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    partnerId: 'p1'
  },
  {
    id: 'v2',
    name: 'Padel & Beach Club',
    address: 'Rua das Flores, 450 - Curitiba, PR',
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    partnerId: 'p2'
  }
];

export const MOCK_COURTS: Court[] = [
  {
    id: 'c1',
    venueId: 'v1',
    name: 'Quadra de Society 1 (Gramado Pro)',
    sport: 'Futebol',
    pricePerHour: 180,
    image: 'https://images.unsplash.com/photo-1529900948638-21f49493bf6c?auto=format&fit=crop&q=80&w=800',
    description: 'Gramado sintético de última geração com iluminação LED.'
  },
  {
    id: 'c2',
    venueId: 'v1',
    name: 'Quadra Basquete Coberta',
    sport: 'Basquete',
    pricePerHour: 120,
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800',
    description: 'Piso de madeira flutuante e vestiários climatizados.'
  },
  {
    id: 'c3',
    venueId: 'v2',
    name: 'Beach Tennis Arena 1',
    sport: 'Beach Tennis',
    pricePerHour: 100,
    image: 'https://images.unsplash.com/photo-1614633312327-148d00114d28?auto=format&fit=crop&q=80&w=800',
    description: 'Areia tratada e ambiente familiar.'
  },
  {
    id: 'c4',
    venueId: 'v2',
    name: 'Quadra de Tênis Saibro',
    sport: 'Tênis',
    pricePerHour: 150,
    image: 'https://images.unsplash.com/photo-1595435066359-e1804b1e71f0?auto=format&fit=crop&q=80&w=800',
    description: 'Quadra oficial de saibro.'
  }
];
