import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { City } from './city';
import { Offer, OfferPreview } from './offer';
import { Review } from './review';
import { UserInfo } from './user-info';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserData = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
  favorites: OfferPreview[];
}

export type OfferData = {
  offer: Offer | null;
  offersNearby: OfferPreview[];
  reviews: Review[];
  isLoading: boolean;
}

export type OffersData = {
  offers: OfferPreview[];
  isLoading: boolean;
}

export type ActiveCityData = {
  activeCity: City;
}
