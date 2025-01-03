import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, CityName, NameSpace } from '../../const.ts';
import { ActiveCityData } from '../../types/state.ts';
import { City } from '../../types/city.ts';

const initialState: ActiveCityData = {
  activeCity: Cities[CityName.Paris]
};

const citySlice = createSlice({
  name: NameSpace.ActiveCity,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<City>) => {
      state.activeCity = action.payload;
    }
  }
});

export const cityReducer = citySlice.reducer;
export const { setActiveCity } = citySlice.actions;
