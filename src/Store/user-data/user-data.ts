import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { UserData } from '../../types/state.ts';
import { UserInfo } from '../../types/user-info.ts';
import { OfferPreview } from '../../types/offer.ts';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  favorites: []
};

const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
    },
    setFavorites: (state, action: PayloadAction<OfferPreview[]>) => {
      state.favorites = action.payload;
    }
  }
});

export const userReducer = userSlice.reducer;
export const { requireAuthorization, setUserInfo, setFavorites } = userSlice.actions;
