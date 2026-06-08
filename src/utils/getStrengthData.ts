interface StrengthData {
  bgColor: string;
  textColor: string;
  strengthText: 'Weak' | 'Fair' | 'Strong!';
}

export const getStrengthData = (password: string, score: number): StrengthData => {
  if (!password || score === 0) {
    return {
      bgColor: 'bg-weak-pass',
      textColor: 'text-weak-pass',
      strengthText: 'Weak',
    };
  }
  if (score <= 2) {
    return {
      bgColor: 'bg-weak-pass',
      textColor: 'text-weak-pass',
      strengthText: 'Weak',
    };
  }
  if (score === 3) {
    return {
      bgColor: 'bg-fair-pass',
      textColor: 'text-fair-pass',
      strengthText: 'Fair',
    };
  }
  return {
    bgColor: 'bg-strong-pass',
    textColor: 'text-strong-pass',
    strengthText: 'Strong!',
  };
};
