import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import StrengthBar from '../StrengthBar';

describe('StrengthBar Component', () => {
  test('Should render default weak state when password is empty', () => {
    render(<StrengthBar password="" />);

    expect(screen.getByText('Weak')).toBeInTheDocument();

    expect(screen.getByText('○ 123 (number)')).toBeInTheDocument();
    expect(screen.getByText('○ abc (lowercase)')).toBeInTheDocument();
    expect(screen.getByText('○ ABC (uppercase)')).toBeInTheDocument();
    expect(screen.getByText('○ #$& (special)')).toBeInTheDocument();
  });

  test('Should update specific requirements but keep "Weak" status for low score passwords', () => {
    render(<StrengthBar password="ab1" />);

    expect(screen.getByText('Weak')).toBeInTheDocument();

    expect(screen.getByText('✓ 123 (number)')).toBeInTheDocument();
    expect(screen.getByText('✓ abc (lowercase)')).toBeInTheDocument();

    expect(screen.getByText('○ ABC (uppercase)')).toBeInTheDocument();
    expect(screen.getByText('○ #$& (special)')).toBeInTheDocument();
  });

  test('Should render "Fair" status when 3 requirements are met', () => {
    render(<StrengthBar password="Ab1" />);

    expect(screen.getByText('Fair')).toBeInTheDocument();

    expect(screen.getByText('✓ 123 (number)')).toBeInTheDocument();
    expect(screen.getByText('✓ abc (lowercase)')).toBeInTheDocument();
    expect(screen.getByText('✓ ABC (uppercase)')).toBeInTheDocument();
    expect(screen.getByText('○ #$& (special)')).toBeInTheDocument();
  });

  test('Should render "Strong!" status and apply correct theme classes when all requirements are met', () => {
    render(<StrengthBar password="Ab1!" />);

    const strengthText = screen.getByText('Strong!');
    expect(strengthText).toBeInTheDocument();

    expect(strengthText).toHaveClass('text-strong-pass');

    expect(screen.getByText('✓ 123 (number)')).toBeInTheDocument();
    expect(screen.getByText('✓ abc (lowercase)')).toBeInTheDocument();
    expect(screen.getByText('✓ ABC (uppercase)')).toBeInTheDocument();
    expect(screen.getByText('✓ #$& (special)')).toBeInTheDocument();
  });
});
