export type FormFieldName = 'name' | 'age' | 'email' | 'password' | 'confirmPassword';

export interface FormField {
  name: FormFieldName;
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  placeholder?: string;
}

export const formFields: FormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'e.g. John',
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    placeholder: 'Your age',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email address',
    placeholder: 'hello@sparcle.com',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Your password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm password',
    placeholder: 'Confirm your password',
  },
];
