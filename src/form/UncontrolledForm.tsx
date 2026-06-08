import { type JSX, useEffect, useRef, useState } from 'react';

import Button from '@/components/ui/Button';
import CountryList from '@/components/ui/CountryList';
import GenderSelector from '@/components/ui/GenderSelector';
import Input from '@/components/ui/Input';
import StrengthBar from '@/components/ui/StrengthBar';
import TermsCheckbox from '@/components/ui/TermsCheckbox';
import type { Submission } from '@/store/formSlice';
import { useAppSelector } from '@/store/hooks';
import type { FormErrors } from '@/types/form';

import { formFields, isFormKey } from './config/formFields';
import formSchema, { type FormSchemaType } from './config/validation';

type Props = {
  onSubmit: (data: FormSchemaType, formType: Submission['formType']) => void;
};

const UncontrolledForm = ({ onSubmit }: Props): JSX.Element => {
  const countries = useAppSelector((state) => state.countries.countries);
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordValue, setPasswordValue] = useState('');
  const pictureRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const rawData = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      gender: formData.get('gender') ?? '',
      country: formData.get('country') ?? '',
      picture: pictureRef.current?.files ?? null,
      terms: formData.get('terms') === 'on',
    };

    const result = formSchema(countries).safeParse(rawData);

    if (!result.success) {
      const formattedErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (isFormKey(fieldName)) {
          if (!formattedErrors[fieldName]) {
            formattedErrors[fieldName] = issue.message;
          }
        }
      });

      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data, 'uncontrolled');
    form.reset();
    setPasswordValue('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  return (
    <form onSubmit={submitHandler} className="flex w-full flex-col gap-1 sm:gap-2" noValidate>
      {formFields.map((field) => {
        const isPasswordField = field.name === 'password';
        const isNameField = field.name === 'name';
        return (
          <div key={field.name} className="flex w-full flex-col gap-1">
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              error={errors[field.name]}
              ref={isNameField ? nameInputRef : undefined}
              {...(isPasswordField ? { onChange: handlePasswordChange } : {})}
            />
            {isPasswordField && <StrengthBar password={passwordValue} />}
          </div>
        );
      })}
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-2">
        <GenderSelector error={errors.gender} />
        <CountryList error={errors.country} />
      </div>
      <Input ref={pictureRef} type="file" id="picture" name="picture" label="Profile picture" error={errors.picture} />
      <TermsCheckbox error={errors.terms} />

      <Button type="submit" text="Ready to rock!" />
    </form>
  );
};

export default UncontrolledForm;
