import { City } from './types/city';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  OfferId = '/offer/:offerId',
  Offer = '/offer',
  OfferNotFound = '/offer-not-found'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
  Comments = '/comments',
  Favorite = '/favorite'
}

export enum NameSpace {
  User = 'User',
  Offer = 'Offer',
  Offers = 'Offers',
  ActiveCity = 'City'
}

export enum SortingOptions {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export const Cities: { [name in CityName]: City } = {
  'Paris': {
    name: CityName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12
    }
  },
  'Cologne': {
    name: CityName.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12
    }
  },
  'Brussels': {
    name: CityName.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 12
    }
  },
  'Amsterdam': {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 12
    }
  },
  'Hamburg': {
    name: CityName.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 12
    }
  },
  'Dusseldorf': {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 12
    }
  }
};

export const MAX_OFFER_IMAGES_COUNT = 6;

export const MAX_REVIEWS_COUNT = 10;

export const MAX_COMMENT_LENGTH = 300;

export const MIN_COMMENT_LENGTH = 50;

export const MAX_NEARBY_OFFERS_COUNT = 3;

export const TILE_LAYER =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
