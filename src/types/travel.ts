export type TravelCategory = 'all' | 'adventure' | 'cultural' | 'coastal' | 'wildlife';

export interface ItineraryActivity {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  included: boolean;
  highlightBadge?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  accommodation: string;
  mealsIncluded: string[];
  activities: ItineraryActivity[];
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: TravelCategory;
  destination: {
    country: string;
    region: string;
    coordinates?: [number, number];
  };
  durationDays: number;
  groupSize: {
    min: number;
    max: number;
  };
  pricing: {
    basePriceUSD: number;
    currencySymbol: string;
    priceQualifier: 'per person' | 'per group';
    depositRequiredUSD: number;
  };
  rating: {
    score: number;
    reviewCount: number;
  };
  heroImage: string;
  galleryImages: string[];
  badges: string[];
  keyHighlights: string[];
  includedFeatures: string[];
  excludedFeatures: string[];
  itinerary: ItineraryDay[];
  nextDepartureDates: string[];
}

export interface TripFilterState {
  destinationQuery: string;
  category: TravelCategory;
  maxPriceUSD: number;
  durationRange: 'any' | '1-7' | '8-14' | '15+';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'duration' | 'rating';
}

export interface CustomTripInquiry {
  step: 1 | 2 | 3 | 4;
  destinations: string[];
  travelStyle: string;
  travelerCount: {
    adults: number;
    children: number;
  };
  approximateMonth: string;
  durationDays: number;
  estimatedBudgetPerPerson: number;
  preferredAccommodation: 'Standard Boutique' | 'Premium Comfort' | 'Luxury & Wellness';
  contact: {
    fullName: string;
    email: string;
    phone: string;
    specialNotes: string;
  };
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorLocation: string;
  avatarUrl: string;
  tourName: string;
  rating: number;
  verifiedBooking: boolean;
  travelDate: string;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Booking & Payments' | 'Preparation & Packing' | 'Flexibility & Changes' | 'Safety & Support';
}
