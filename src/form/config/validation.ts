import { z } from 'zod';

import { validateEmailBasic } from '@/utils/validateEmailBasic';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png']);

const formSchema = (countries: readonly string[]) =>
  z
    .object({
      name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .refine((val) => /^[A-ZА-Я]/.test(val), {
          message: 'First letter must be uppercase',
        }),

      age: z
        .string()
        .min(1, 'Please enter your age')
        .refine((val) => !Number.isNaN(Number(val)), 'Must be a number')
        .refine((val) => Number.isInteger(Number(val)), 'Age must be an integer')
        .refine((val) => Number(val) >= 0, 'Age cannot be negative')
        .refine((val) => Number(val) <= 150, 'Age cannot exceed 150'),

      email: z.string().min(1, 'Email is required').refine(validateEmailBasic, {
        message: 'Invalid email format (e.g. example@gmail.com)',
      }),

      gender: z.string().min(1, 'Please select a gender'),

      country: z
        .string()
        .min(1, 'Please select a country')
        .refine((val) => countries.includes(val), {
          message: 'Please select a valid country from the list',
        }),

      password: z
        .string()
        .min(1, 'Please enter your password')
        .regex(/[a-zA-Z]/, 'Must contain English letters')
        .min(6, 'Password must be at least 6 characters'),

      confirmPassword: z.string().min(1, 'Please confirm your password'),
      picture: z
        .custom<FileList>()
        .refine((files) => files && files.length > 0, 'Image is required.')
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 3MB.')
        .refine((files) => ACCEPTED_IMAGE_TYPES.has(files?.[0]?.type), 'Only .jpeg, and .png formats are supported.'),

      terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'Passwords must match',
          path: ['confirmPassword'],
        });
      }
    });

export type FormSchemaType = z.infer<ReturnType<typeof formSchema>>;
export default formSchema;
