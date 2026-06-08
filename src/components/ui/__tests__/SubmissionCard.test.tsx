import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { mockSubmissions } from '@/__tests__/mocks/submissions';

import SubmissionCard from '../SubmissionCard';

const johnSubmission = mockSubmissions[0];
const janeSubmission = mockSubmissions[1];

describe('SubmissionCard Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('Should correctly render all submission data and format ID', () => {
    render(<SubmissionCard submission={johnSubmission} isNew={false} />);

    expect(screen.getByText('ID: #11111')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Pass1!')).toBeInTheDocument();
    expect(screen.getByText('100 / male')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', 'https://example.com/john.jpg');
    expect(avatar).toHaveAttribute('alt', 'John Doe avatar');
  });

  test('Should apply correct badge style for uncontrolled form type', () => {
    render(<SubmissionCard submission={janeSubmission} isNew={false} />);

    const badge = screen.getByText('uncontrolled');
    expect(badge).toHaveClass('text-accent');
    expect(badge).not.toHaveClass('text-accent-muted');
  });

  test('Should apply correct badge style for rhf form type', () => {
    render(<SubmissionCard submission={johnSubmission} isNew={false} />);

    const badge = screen.getByText('react hook form');
    expect(badge).toHaveClass('text-accent-muted');
    expect(badge).not.toHaveClass('text-accent');
  });

  test('Should render accepted terms layout correctly', () => {
    render(<SubmissionCard submission={johnSubmission} isNew={false} />);

    const termsStatus = screen.getByText('✓ Accepted');
    expect(termsStatus).toBeInTheDocument();
    expect(termsStatus).toHaveClass('text-success', 'glow-green');
  });

  test('Should handle "isNew" lifecycle: show badge/styles and hide them after 5 seconds', () => {
    render(<SubmissionCard submission={johnSubmission} isNew={true} />);

    const badge = screen.getByText('New');
    expect(badge).toBeInTheDocument();

    const card = screen.getByRole('article');
    expect(card).toHaveClass('border-accent', 'animate-pulse');

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(badge).not.toBeInTheDocument();
    expect(card).not.toHaveClass('border-accent', 'animate-pulse');
  });
});
