import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TempSubmission = Record<string, unknown>;

interface FormState {
  submissions: TempSubmission[];
}

const initialState: FormState = {
  submissions: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<TempSubmission>) => {
      state.submissions.unshift(action.payload);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export default formSlice.reducer;
