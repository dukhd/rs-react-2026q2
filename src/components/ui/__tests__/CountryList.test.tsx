import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';

import CountryList from '../CountryList';

const mockCountries = ['Canada', 'Germany', 'Ukraine', 'United States'];
const MOCK_INITIAL_STATE: { countries: string[] } = { countries: [] };
const DEFAULT_PRELOADED_STATE = { countries: { countries: mockCountries } };

const renderCountryList = (preloadedState = DEFAULT_PRELOADED_STATE, props?: Record<string, unknown>) => {
  const store = configureStore({
    reducer: {
      countries: (state = MOCK_INITIAL_STATE) => state,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <CountryList {...props} />
    </Provider>
  );
};

describe('CountryList Component', () => {
  test('Should render input field linked with correct datalist options', () => {
    renderCountryList();

    expect(screen.getByText('Country')).toBeInTheDocument();

    const input = screen.getByPlaceholderText<HTMLInputElement>('Select country');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('list', 'countries');

    const datalist = input.list;
    expect(datalist).not.toBeNull();
    expect(datalist?.id).toBe('countries');

    const options = datalist?.options;
    expect(options).toBeDefined();
    expect(options).toHaveLength(4);

    expect(options?.[0]).toHaveAttribute('value', 'Canada');
    expect(options?.[2]).toHaveAttribute('value', 'Ukraine');
  });

  test('Should allow user to type a country name', async () => {
    renderCountryList();
    const input = screen.getByPlaceholderText<HTMLInputElement>('Select country');

    expect(input.value).toBe('');

    await userEvent.type(input, 'Germany');
    expect(input.value).toBe('Germany');
  });

  test('Should display error message and apply error theme classes when error is passed', () => {
    const errorMessage = 'Please select a valid country from the list';

    renderCountryList(undefined, { error: errorMessage });

    const errorSpan = screen.getByText(errorMessage);
    expect(errorSpan).toBeInTheDocument();
    expect(errorSpan).toHaveClass('visible', 'opacity-100');

    const input = screen.getByPlaceholderText('Select country');
    expect(input).toHaveClass('border-error/50');
  });
});
