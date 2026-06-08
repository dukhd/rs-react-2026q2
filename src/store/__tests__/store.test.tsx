import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';

import { addSubmission, type Submission } from '../formSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { store } from '../store';

function TestComponent() {
  const dispatch = useAppDispatch();
  const submissions = useAppSelector((state) => state.form.submissions);

  const handleAdd = () => {
    const mockSubmission: Submission = {
      id: 'test-id',
      formType: 'uncontrolled',
      data: {
        name: 'Jane Smith',
        age: '100',
        email: 'jane@example.com',
        gender: 'female',
        country: 'Canada',
        password: 'Pass2!',
        confirmPassword: 'Pass2!',
        terms: true,
        picture: '',
      },
    };
    dispatch(addSubmission(mockSubmission));
  };

  return (
    <div>
      <button onClick={handleAdd}>Submit</button>
      <div data-testid="count">{submissions.length}</div>
      {submissions.length > 0 && <span data-testid="first-name">{submissions[0].data.name}</span>}
    </div>
  );
}

describe('Redux Store', () => {
  test('Should dispatch actions and select state correctly using custom hooks', async () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const countEl = screen.getByTestId('count');
    expect(countEl).toHaveTextContent('0');

    const button = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(button);

    expect(countEl).toHaveTextContent('1');
    expect(screen.getByTestId('first-name')).toHaveTextContent('Jane');
  });
});
