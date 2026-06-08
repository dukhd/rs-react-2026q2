import { describe, expect, test } from 'vitest';

import { validateEmailBasic } from '../validateEmailBasic';

describe('validateEmailBasic utility', () => {
  test('Should return true for a standard valid email', () => {
    expect(validateEmailBasic('john.doe@example.com')).toBe(true);
  });

  test('Should return false for an empty string or spaces only', () => {
    expect(validateEmailBasic('')).toBe(false);
    expect(validateEmailBasic('   ')).toBe(false);
  });

  test('Should return false if there is no @ symbol', () => {
    expect(validateEmailBasic('no-at-sign.com')).toBe(false);
  });

  test('Should return false if there are multiple @ symbols', () => {
    expect(validateEmailBasic('user@info@domain.com')).toBe(false);
  });

  test('Should return false if email contains forbidden special characters', () => {
    expect(validateEmailBasic('user!effect@mail.com')).toBe(false);
    expect(validateEmailBasic('hello#world@test.com')).toBe(false);
  });

  test('Should return false if email contains double dots', () => {
    expect(validateEmailBasic('abc..def@mail.com')).toBe(false);
  });

  test('Should return false if the local part ends with a dot', () => {
    expect(validateEmailBasic('local.@domain.com')).toBe(false);
  });

  test('Should return false if the domain starts or ends with a dot', () => {
    expect(validateEmailBasic('user@.domain.com')).toBe(false);
    expect(validateEmailBasic('user@domain.com.')).toBe(false);
  });

  test('Should return false if the domain part does not contain any dots', () => {
    expect(validateEmailBasic('username@nodotdomain')).toBe(false);
  });

  test('Should return false if the local part is missing', () => {
    expect(validateEmailBasic('@domain.com')).toBe(false);
  });

  test('Should return false if the domain part is missing', () => {
    expect(validateEmailBasic('username@')).toBe(false);
  });
});
