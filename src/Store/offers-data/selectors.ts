import { NameSpace } from '../../const';
import { OfferPreview } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): OfferPreview[] => state[NameSpace.Offers].offers;

export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isLoading;
