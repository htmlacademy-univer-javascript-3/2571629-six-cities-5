import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { Offer, OfferPreview } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AuthInfo } from '../types/auth-info';
import { UserInfo } from '../types/user-info';
import { Review } from '../types/review';
import { requireAuthorization, setFavorites, setUserInfo } from './user-data/user-data';
import { setOffersDataLoadingStatus, setOffers, updateOffers } from './offers-data/offers-data';
import { addReview, setOffer, setOfferPageDataLoadingStatus, setOffersNearby, setReviews, updateOffersNearby } from './offer-data/offer-data';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);
      dispatch(setOffers(data));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const fetchOfferPageInformation = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOfferPageDataLoadingStatus(true));
    try {
      const [offerDetails, offersNearby, offerReviews] = await Promise.all([
        api.get<Offer>(`${APIRoute.Offers}/${offerId}`),
        api.get<OfferPreview[]>(`${APIRoute.Offers}/${offerId}/nearby`),
        api.get<Review[]>(`${APIRoute.Comments}/${offerId}`)
      ]);
      dispatch(setOffer(offerDetails.data));
      dispatch(setOffersNearby(offersNearby.data));
      dispatch(setReviews(offerReviews.data));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.OfferNotFound));
    } finally {
      dispatch(setOfferPageDataLoadingStatus(false));
    }
  }
);

export const sendReview = createAsyncThunk<void, {
  offerId: string;
  comment: string;
  rating: number;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendReview',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    dispatch(addReview(data));
  }
);

export const fetchFavorites = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(setFavorites(data));
  }
);

export const changeFavoriteStatus = createAsyncThunk<void, {
  offerId: string;
  status: number;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteStatus',
  async ({status, offerId}, {extra: api, dispatch}) => {
    const {data} = await api.post<OfferPreview>(`${APIRoute.Favorite}/${offerId}/${status}`);
    dispatch(updateOffers(data));
    dispatch(updateOffersNearby(data));
    dispatch(fetchFavorites());
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserInfo>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserInfo(data));
      dispatch(fetchFavorites());
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<void, AuthInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserInfo>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserInfo(data));
    dispatch(fetchOffers());
    dispatch(fetchFavorites());
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserInfo(null));
  }
);
