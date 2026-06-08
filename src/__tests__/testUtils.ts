import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

export const fillValidForm = async (allowedCountry = 'USA') => {
  await userEvent.type(screen.getByLabelText(/name/i), 'John');
  await userEvent.type(screen.getByLabelText(/age/i), '25');
  await userEvent.type(screen.getByLabelText(/email address/i), 'john@gmail.com');
  await userEvent.type(screen.getByLabelText('Password'), 'Pass123');
  await userEvent.type(screen.getByLabelText(/confirm password/i), 'Pass123');

  await userEvent.type(screen.getByLabelText(/country/i), allowedCountry);
  await userEvent.selectOptions(screen.getByLabelText(/gender/i), 'Male');

  const file = new File(['fake-image'], 'avatar.png', { type: 'image/png' });
  await userEvent.upload(screen.getByLabelText(/profile picture/i), file);

  await userEvent.click(screen.getByRole('checkbox'));
};
