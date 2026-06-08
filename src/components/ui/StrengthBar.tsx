import type { JSX } from 'react';

import { getStrengthData } from '@/utils/getStrengthData';
import { checkPasswordStrength } from '@/utils/passwordStrength';

type StrengthBarProps = {
  password?: string;
};

const StrengthBar = ({ password = '' }: StrengthBarProps): JSX.Element => {
  const { hasNumber, hasUppercase, hasLowercase, hasSpecial, score } = checkPasswordStrength(password);
  const { bgColor, textColor, strengthText } = getStrengthData(password, score);

  const requirements = [
    { met: hasNumber, label: '123 (number)' },
    { met: hasLowercase, label: 'abc (lowercase)' },
    { met: hasUppercase, label: 'ABC (uppercase)' },
    { met: hasSpecial, label: '#$& (special)' },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="mt-1 flex h-1 gap-1 px-2">
        {[1, 2, 3, 4].map((index) => {
          const isActive = password.length > 0 && index <= score;
          return (
            <div
              key={index}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                isActive ? `${bgColor}` : 'bg-accent-muted/20'
              }`}
            />
          );
        })}
      </div>

      <div className="mx-2 flex flex-wrap items-center justify-between gap-1 text-xs">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-left">
          {requirements.map((req) => (
            <span
              key={req.label}
              className={`transition-colors duration-300 ${
                password && req.met ? 'text-strong-pass font-medium' : 'text-requirements'
              }`}
            >
              {password && req.met ? '✓' : '○'} {req.label}
            </span>
          ))}
        </div>

        <p className={`${textColor} text-right text-xs font-semibold transition-colors duration-300`}>{strengthText}</p>
      </div>
    </div>
  );
};

export default StrengthBar;
