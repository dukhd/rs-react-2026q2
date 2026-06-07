import type { FormSchemaType } from './validation';

type FormFieldName = keyof FormSchemaType;
interface FormField {
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

export const ALL_FORM_KEYS: FormFieldName[] = [
  'name',
  'age',
  'email',
  'password',
  'confirmPassword',
  'gender',
  'country',
  'picture',
  'terms',
];

export const isFormKey = (key: unknown): key is FormFieldName => {
  if (typeof key !== 'string') return false;
  const stringKeys: string[] = ALL_FORM_KEYS;
  return stringKeys.includes(key);
};
