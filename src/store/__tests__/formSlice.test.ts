import { describe, expect, test } from 'vitest';

import formReducer, { addSubmission, type Submission } from '../formSlice';

const createMockSubmission = (id: string): Submission => ({
  id,
  formType: 'react hook form',
  data: {
    name: 'John Doe',
    age: '100',
    email: 'john@example.com',
    gender: 'male',
    country: 'USA',
    password: 'Pass1!',
    confirmPassword: 'Pass1!',
    terms: true,
    picture: 'data:image/png;base64,mock_string',
  },
});

describe('formSlice', () => {
  test('Should return the initial state', () => {
    const initialState = formReducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual({ submissions: [] });
  });

  test('Should handle addSubmission and prepend items to the array', () => {
    const stateWithOneItem = {
      submissions: [createMockSubmission('first-id')],
    };

    const newSubmission = createMockSubmission('second-id');
    const nextState = formReducer(stateWithOneItem, addSubmission(newSubmission));

    expect(nextState.submissions).toHaveLength(2);

    expect(nextState.submissions[0]).toEqual(newSubmission);
    expect(nextState.submissions[1].id).toBe('first-id');
  });
});
