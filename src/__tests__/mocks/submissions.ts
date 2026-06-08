import type { Submission } from '@/store/formSlice';

export const mockSubmissions: Submission[] = [
  {
    id: '11111-alpha-id',
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
      picture: 'https://example.com/john.jpg',
    },
  },
  {
    id: '22222-beta-id',
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
      picture: 'https://example.com/jane.jpg',
    },
  },
];
