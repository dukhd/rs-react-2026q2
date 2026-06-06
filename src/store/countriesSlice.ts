import { createSlice } from '@reduxjs/toolkit';

import { countriesData } from '@/form/config/countriesData';

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: countriesData,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
