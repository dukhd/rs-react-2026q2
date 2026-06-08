import { createSlice } from '@reduxjs/toolkit';

import { COUNTRIES_LIST } from '@/form/config/countriesData';

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: COUNTRIES_LIST,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
