import { NameSpace } from '../../const';
import { Offer, OfferPreview } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].offer;

export const getOffersNearby = (state: State): OfferPreview[] => state[NameSpace.Offer].offersNearby;

export const getReviews = (state: State): Review[] => state[NameSpace.Offer].reviews;

export const getOfferPageDataLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isLoading;
