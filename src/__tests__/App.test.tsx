import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';

import App from '../App';
import formReducer from '../store/formSlice';
import { convertToBase64 } from '../utils/fileToBase64';

const mockFile = new File([], 'john.jpg', { type: 'image/jpeg' });

vi.mock('../utils/fileToBase64', () => ({
  convertToBase64: vi.fn(),
}));

vi.mock('../components/layout/Header', () => ({
  default: () => <div>Header</div>,
}));

vi.mock('../components/layout/SubmissionLog', () => ({
  default: () => <div>Log</div>,
}));

vi.mock('../form/UncontrolledForm', () => ({
  default: ({ onSubmit }: { onSubmit: (data: { name: string; picture: File[] }, type: string) => void }) => (
    <button onClick={() => onSubmit({ name: 'John', picture: [mockFile] }, 'uncontrolled')}>submit uncontrolled</button>
  ),
}));

vi.mock('../form/ReactHookForm', () => ({
  default: ({ onSubmit }: { onSubmit: (data: { name: string; picture: File[] }, type: string) => void }) => (
    <button onClick={() => onSubmit({ name: 'Jane', picture: [] }, 'react hook form')}>submit rhf</button>
  ),
}));

const renderApp = () => {
  const store = configureStore({
    reducer: {
      form: formReducer,
    },
  });

  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', {
      randomUUID: () => 'fixed-id',
    });
  });

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  test('Should render main layout', () => {
    renderApp();

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Log')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open uncontrolled form/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /open react hook form/i })).toBeInTheDocument();
  });

  test('Should open uncontrolled form', async () => {
    renderApp();

    await userEvent.click(screen.getByRole('button', { name: /open uncontrolled form/i }));

    expect(screen.getByText('submit uncontrolled')).toBeInTheDocument();
  });

  test('Should open react hook form', async () => {
    renderApp();

    await userEvent.click(screen.getByRole('button', { name: /open react hook form/i }));

    expect(screen.getByText('submit rhf')).toBeInTheDocument();
  });

  test('Should submit uncontrolled form and converts file', async () => {
    vi.mocked(convertToBase64).mockResolvedValue('data:image/jpeg;base64,mocked');

    renderApp();

    await userEvent.click(screen.getByRole('button', { name: /open uncontrolled form/i }));
    await userEvent.click(screen.getByText('submit uncontrolled'));

    expect(convertToBase64).toHaveBeenCalledWith(mockFile);
    expect(screen.queryByText('submit uncontrolled')).not.toBeInTheDocument();
  });

  test('Should close modal after submit', async () => {
    renderApp();

    await userEvent.click(screen.getByRole('button', { name: /open react hook form/i }));
    await userEvent.click(screen.getByText('submit rhf'));

    expect(screen.queryByText('submit rhf')).not.toBeInTheDocument();
  });
});
