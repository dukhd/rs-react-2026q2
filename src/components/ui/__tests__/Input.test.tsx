import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

import Input from '../Input';

describe('Input Component', () => {
  test('Should render input with correct label and placeholder', () => {
    render(<Input id="email" label="Email address" placeholder="Enter your email" />);

    expect(screen.getByText('Email address')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'email');
  });

  test('Should automatically focus the input when id is "name"', () => {
    render(<Input id="name" label="Full Name" />);

    const input = screen.getByRole('textbox', { name: /full name/i });

    expect(input).toHaveFocus();
  });

  test('Should display error message and apply error styles when error is provided', () => {
    const errorMessage = 'Name must be at least 2 characters';

    render(<Input id="name" label="Name" error={errorMessage} />);

    const errorSpan = screen.getByText(errorMessage);
    expect(errorSpan).toBeInTheDocument();
    expect(errorSpan).toHaveClass('visible', 'opacity-100');

    const input = screen.getByRole('textbox', { name: /name/i });
    expect(input).toHaveClass('border-error/50');
  });

  test('Should call register function and spread its properties', () => {
    const mockRegisterProps = {
      name: 'email',
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    };
    const mockRegister = vi.fn().mockReturnValue(mockRegisterProps);

    render(<Input id="email" label="Email" register={mockRegister} />);

    expect(mockRegister).toHaveBeenCalledWith('email');

    const input = screen.getByRole('textbox', { name: /email/i });
    expect(input).toHaveAttribute('name', 'email');
  });

  test('Should forward native ref when register is not provided', () => {
    const inputRef = React.createRef<HTMLInputElement>();

    render(<Input id="picture" label="Profile picture" ref={inputRef} />);

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(inputRef.current?.id).toBe('picture');
  });
});
