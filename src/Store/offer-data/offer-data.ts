import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { OfferData } from '../../types/state.ts';
import { Offer, OfferPreview } from '../../types/offer.ts';
import { Review } from '../../types/review.ts';

const initialState: OfferData = {
  offer: null,
  offersNearby: [],
  reviews: [],
  isLoading: false
};

const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setOffer: (state, action: PayloadAction<Offer>) => {
      state.offer = action.payload;
    },
    setOffersNearby: (state, action: PayloadAction<OfferPreview[]>) => {
      state.offersNearby = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setOfferPageDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateOffersNearby: (state, action: PayloadAction<OfferPreview>) => {
      state.offersNearby = state.offersNearby.map((offer) => offer.id === action.payload.id ? action.payload : offer);
    }
  },
});

export const offerReducer = offerSlice.reducer;
export const { setOffer, setOffersNearby, setReviews, addReview, setOfferPageDataLoadingStatus, updateOffersNearby } = offerSlice.actions;
