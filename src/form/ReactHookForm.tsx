import { zodResolver } from '@hookform/resolvers/zod';
import { type JSX, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Button from '@/components/ui/Button';
import CountryList from '@/components/ui/CountryList';
import GenderSelector from '@/components/ui/GenderSelector';
import Input from '@/components/ui/Input';
import StrengthBar from '@/components/ui/StrengthBar';
import TermsCheckbox from '@/components/ui/TermsCheckbox';
import type { Submission } from '@/store/formSlice';
import { useAppSelector } from '@/store/hooks';

import { formFields } from './config/formFields';
import formSchema, { type FormSchemaType } from './config/validation';

type Props = {
  onSubmit: (data: FormSchemaType, formType: Submission['formType']) => void;
};

const ReactHookForm = ({ onSubmit }: Props): JSX.Element => {
  const countries = useAppSelector((state) => state.countries.countries);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormSchemaType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema(countries)),
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      terms: false,
      picture: undefined,
    },
  });

  const password = useWatch({ control, name: 'password' });

  useEffect(() => {
    if (touchedFields['confirmPassword']) trigger('confirmPassword');
  }, [password, trigger, touchedFields]);

  const submitHandler = (data: FormSchemaType) => {
    onSubmit(data, 'react hook form');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate className="flex w-full flex-col gap-1 sm:gap-2">
      {formFields.map((field) => (
        <div key={field.name} className="flex w-full flex-col gap-1">
          <Input
            key={field.name}
            id={field.name}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            register={register}
            error={errors[field.name]?.message}
          />
          {field.name === 'password' && <StrengthBar password={password} />}
        </div>
      ))}
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-2">
        <GenderSelector register={register} error={errors.gender?.message} />
        <CountryList register={register} error={errors.country?.message} />
      </div>
      <Input type="file" id="picture" label="Profile picture" register={register} error={errors.picture?.message} />
      <TermsCheckbox register={register} error={errors.terms?.message} />

      <Button type="submit" text="Ready to rock!" disabled={!isValid} />
    </form>
  );
};

export default ReactHookForm;
