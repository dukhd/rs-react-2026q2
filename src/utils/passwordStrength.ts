interface PasswordRequirements {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecial: boolean;
  score: number;
}

export const checkPasswordStrength = (password: string): PasswordRequirements => {
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecial = /[^A-Za-zА-Яа-яЁё0-9\s]/.test(password);

  const score = [hasNumber, hasUppercase, hasLowercase, hasSpecial].filter(Boolean).length;

  return {
    hasNumber,
    hasUppercase,
    hasLowercase,
    hasSpecial,
    score,
  };
};
