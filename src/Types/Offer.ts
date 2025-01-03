import { City } from './city';
import { Location } from './location';
import { User } from './user';

export type OfferPreview = {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'hotel' | 'room';
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Offer = OfferPreview & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};
