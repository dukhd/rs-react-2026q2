import type { JSX } from 'react';

import { useAppSelector } from '@/store/hooks';

import SubmissionCard from '../ui/SubmissionCard';

const SubmissionLog = (): JSX.Element => {
  const submissions = useAppSelector((state) => state.form.submissions);

  return (
    <div className="mt-8">
      <div className="relative flex w-full items-center py-5">
        <div className="via-border-strong h-px grow animate-pulse bg-linear-to-r from-transparent to-transparent"></div>
        <span className="text-subtle glass-panel rounded-full px-4 py-2 text-xs tracking-widest uppercase sm:text-sm">
          Submission history log
        </span>
        <div className="via-border-strong h-px grow animate-pulse bg-linear-to-r from-transparent to-transparent"></div>
      </div>

      {submissions.length > 0 ? (
        <section className="mx-auto mt-4 mb-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </section>
      ) : (
        <div className="glass-panel border-border-subtle mx-auto mt-8 max-w-md rounded-3xl border p-8 text-center shadow-lg">
          <div className="text-subtle mb-3 animate-bounce text-4xl">∅</div>
          <h2 className="text-text-primary mb-2 text-lg font-semibold sm:text-xl">No data submitted yet</h2>
          <p className="text-subtle text-sm leading-relaxed">
            Click on the buttons above to open a form. Fill in your details and watch your custom card appear in this
            log in real-time.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmissionLog;
