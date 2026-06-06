import type { UseFormRegister } from 'react-hook-form';

import type { FormSchemaType } from '@/form/config/validation';

export interface BaseFormFieldProps {
  error?: string;
  register?: UseFormRegister<FormSchemaType>;
}
