import { type JSX } from 'react';

const AboutPage = (): JSX.Element => {
  return (
    <div className="flex min-h-[calc(100vh-(--spacing(42)))] items-center justify-center">
      <div className="flex max-w-180 flex-col items-center gap-3">
        <h2 className="mb-3 self-start text-4xl font-bold">About</h2>
        <p className="shadow-about-card-1 border-second rounded-2xl border-4 p-6 text-xl">
          Hey I&apos;m{' '}
          <span className="text-accent-blue text-2xl font-bold">Diana</span>!
          I&apos;m a Front-end developer in progress, exploring React, APIs, and
          UI architecture through hands-on projects like this one.
        </p>
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between md:gap-1">
          <div className="shadow-about-card-2 border-second flex h-45 w-full max-w-180 flex-col items-start gap-3 rounded-2xl border-4 p-5 md:w-88">
            <span className="text-gray bg-sub-bg-gray rounded-sm px-3 py-1 text-sm font-bold uppercase">
              Author:{' '}
            </span>
            <a
              className="text-second text-xl font-bold capitalize hover:underline"
              href="https://github.com/dukhd"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Dukhd
            </a>
          </div>
          <div className="shadow-about-card-3 border-second flex h-45 w-full max-w-180 flex-col items-start gap-3 rounded-2xl border-4 p-5 md:w-88">
            <span className="text-gray bg-sub-bg-gray rounded-sm px-3 py-1 text-sm font-bold uppercase">
              Mentor:
            </span>
            <a
              className="text-second text-xl font-bold capitalize hover:underline"
              href="https://github.com/aleks6699"
              target="_blank"
              rel="noopener noreferrer"
            >
              @aleks6699
            </a>
            <p className="text-gray text-left text-sm font-medium">
              rare kind of developer who brings order to chaos, transforming
              React confusion into multiverse-level clarity.
            </p>
          </div>
        </div>
        <p className="shadow-about-card-4 border-second flex max-w-180 flex-col items-start gap-3 rounded-2xl border-4 p-6 text-xl">
          This app is a portal-based gallery of characters from the Rick and
          Morty universe, powered by the Rick and Morty API. Each card contains
          a glimpse into different dimensions, where reality is questionable and
          logic is optional.
        </p>
        <hr />
        <p className="text-gray text-base font-bold uppercase">
          The project was created as part of the:{' '}
          <a
            className="text-second text-xl font-bold capitalize hover:underline"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            RS School React Course
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
