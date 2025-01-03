import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { City } from '../../types/city';

export const getActiveCity = (state: State): City => state[NameSpace.ActiveCity].activeCity;
