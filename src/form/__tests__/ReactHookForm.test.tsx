import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';

import { fillValidForm } from '@/__tests__/testUtils';

import ReactHookForm from '../ReactHookForm';

const renderWithStore = (initialCountries = ['USA', 'Canada']) => {
  const mockStore = configureStore({
    reducer: {
      countries: () => ({ countries: initialCountries }),
    },
  });

  const mockOnSubmit = vi.fn();

  render(
    <Provider store={mockStore}>
      <ReactHookForm onSubmit={mockOnSubmit} />
    </Provider>
  );

  return { mockOnSubmit };
};

describe('ReactHookForm Component', () => {
  test('Should render all form fields and handle autofocus on Name', async () => {
    renderWithStore();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ready to rock/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveFocus();
    });
  });

  test('Should show error if name is too short', async () => {
    renderWithStore();

    const nameInput = screen.getByLabelText(/name/i);

    await userEvent.type(nameInput, 'S');
    await userEvent.clear(nameInput);

    expect(await screen.findByText('Name must be at least 2 characters')).toBeInTheDocument();
  });

  test('Should unlock submit button only when all rules are met', async () => {
    renderWithStore();
    const submitButton = screen.getByRole('button', { name: /ready to rock/i });

    expect(submitButton).toBeDisabled();

    await fillValidForm();

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  test('Should call onSubmit with correct data and reset form on successful submit', async () => {
    const { mockOnSubmit } = renderWithStore();

    await fillValidForm();

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Silva');

    const submitButton = screen.getByRole('button', { name: /ready to rock/i });

    await waitFor(() => expect(submitButton).toBeEnabled());
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Silva',
        terms: true,
      }),
      'react hook form'
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });

  test('Should show error if name starts with lowercase letter', async () => {
    renderWithStore();

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, 'j6hn');

    expect(await screen.findByText('First letter must be uppercase')).toBeInTheDocument();
  });

  test('Should show error if passwords do not match', async () => {
    renderWithStore();

    await userEvent.type(screen.getByLabelText('Password'), 'Correct123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'Wrong123');

    await userEvent.click(screen.getByLabelText(/name/i));

    expect(await screen.findByText('Passwords must match')).toBeInTheDocument();
  });

  test('Should reject country if it is not in the Redux store list', async () => {
    renderWithStore(['USA', 'Canada']);

    const countryInput = screen.getByLabelText(/country/i);
    await userEvent.type(countryInput, 'France');
    await userEvent.click(screen.getByLabelText(/name/i));

    expect(await screen.findByText('Please select a valid country from the list')).toBeInTheDocument();
  });
});
