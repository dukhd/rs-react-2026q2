import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';

import { mockSubmissions } from '@/__tests__/mocks/submissions';
import formReducer from '@/store/formSlice';

import SubmissionLog from '../SubmissionLog';

const renderSubmissionLog = (preloadedState?: { form: { submissions: typeof mockSubmissions } }) => {
  const store = configureStore({
    reducer: {
      form: formReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <SubmissionLog />
    </Provider>
  );
};

const mockState = {
  form: {
    submissions: mockSubmissions,
  },
};

describe('SubmissionLog Component', () => {
  test('Should render empty state message when there are no submissions', () => {
    renderSubmissionLog({ form: { submissions: [] } });

    expect(screen.getByRole('heading', { name: /No data submitted yet/i })).toBeInTheDocument();
    expect(screen.getByText(/Click on the buttons above to open a form/i)).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  test('Should render a list of submission cards when data is present in store', () => {
    renderSubmissionLog(mockState);

    expect(screen.getByText(/Submission history log/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Jane Smith' })).toBeInTheDocument();

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
  });
});
