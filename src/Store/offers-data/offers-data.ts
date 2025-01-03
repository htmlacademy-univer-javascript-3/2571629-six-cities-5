import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { OffersData } from '../../types/state.ts';
import { OfferPreview } from '../../types/offer.ts';

const initialState: OffersData = {
  offers: [],
  isLoading: false
};

const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<OfferPreview[]>) => {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateOffers: (state, action: PayloadAction<OfferPreview>) => {
      state.offers = state.offers.map((offer) => offer.id === action.payload.id ? action.payload : offer);
    }
  }
});

export const offersReducer = offersSlice.reducer;
export const { setOffers, setOffersDataLoadingStatus, updateOffers } = offersSlice.actions;
