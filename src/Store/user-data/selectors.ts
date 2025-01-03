import { AuthorizationStatus, NameSpace } from '../../const';
import { OfferPreview } from '../../types/offer';
import { State } from '../../types/state';
import { UserInfo } from '../../types/user-info';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserInfo = (state: State): UserInfo | null => state[NameSpace.User].userInfo;

export const getFavorites = (state: State): OfferPreview[] => state[NameSpace.User].favorites;

export const getFavoritesCount = (state: State): number | undefined => state[NameSpace.User].favorites?.length;
