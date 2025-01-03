import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userReducer } from './user-data/user-data';
import { offerReducer } from './offer-data/offer-data';
import { offersReducer } from './offers-data/offers-data';
import { cityReducer } from './active-city-data/active-city-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userReducer,
  [NameSpace.Offer]: offerReducer,
  [NameSpace.Offers]: offersReducer,
  [NameSpace.ActiveCity]: cityReducer
});
