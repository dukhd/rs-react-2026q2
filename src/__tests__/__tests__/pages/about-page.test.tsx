import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import AboutPage from '@/app/[locale]/about/page';

describe('AboutPage Component', () => {
  test('Should render about section and personal introduction', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: /about/i, level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(/Diana/i)).toBeInTheDocument();
  });

  test('Should render valid external links with correct security attributes', () => {
    render(<AboutPage />);

    const authorLink = screen.getByRole('link', { name: /@dukhd/i });
    const mentorLink = screen.getByRole('link', { name: /@aleks6699/i });
    const courseLink = screen.getByRole('link', {
      name: /rs school react course/i,
    });

    expect(authorLink).toHaveAttribute('href', 'https://github.com/dukhd');
    expect(mentorLink).toHaveAttribute('href', 'https://github.com/aleks6699');
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );

    [authorLink, mentorLink, courseLink].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
