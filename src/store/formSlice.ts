import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { FormSchemaType } from '@/form/config/validation';

export interface SavedSubmission extends Omit<FormSchemaType, 'picture'> {
  picture: string;
}
interface FormState {
  submissions: SavedSubmission[];
}

const initialState: FormState = {
  submissions: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<SavedSubmission>) => {
      state.submissions.unshift(action.payload);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export default formSlice.reducer;
