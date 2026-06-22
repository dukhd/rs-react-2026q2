import { type JSX } from 'react';

import { Link } from '@/i18n/routing';

const NotFoundPage = (): JSX.Element => {
  return (
    <div className="flex min-h-[calc(100vh-(--spacing(42)))] items-center justify-center">
      <div className="flex max-w-120 flex-col items-center gap-3 text-center">
        <h2 className="mb-7 text-8xl font-bold">
          <p>404</p>
          <p className="text-lg">Page Not Found</p>
        </h2>

        <h3 className="text-2xl font-semibold">
          <p>Wubba Lubba Dub-Dub!</p>
          <p>You&apos;re lost in another dimension.</p>
        </h3>

        <p className="mb-5 text-base">
          The page you&apos;re looking for got sucked into a portal gun
          accident. Maybe Rick broke it. Maybe Morty clicked something weird.
          Let&apos;s get you back to reality.
        </p>

        <Link
          className="bg-accent text-second border-border-main shadow-card cursor-pointer rounded-xl border-3 px-7 py-2 text-sm font-bold tracking-wide uppercase transition-shadow duration-300 ease-in-out hover:shadow-none sm:text-base md:text-lg"
          href="/"
        >
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
