export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  rating: number;
  bgImage: string;
  secondaryImages: string[];
  price: string;
  highlights: string[];
  activities: string[];
}

export interface BookingRequest {
  id: string;
  destinationId: string;
  destinationName: string;
  startDate: string;
  durationDays: number;
  guestsCount: number;
  selectedExperiences: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  specialRequests: string;
  status: 'PENDING_VERIFICATION' | 'CONFIRMED' | 'IN_REVIEW' | 'COMPLETED';
  totalPrice: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}
