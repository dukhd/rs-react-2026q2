import type { JSX } from 'react';

import type { Submission } from '@/store/formSlice';

interface SubmissionCardProps {
  submission: Submission;
}

const FIELD_TITLE_STYLES = 'text-label text-sm font-semibold tracking-wider uppercase';
const FIELD_VALUE_STYLES = 'text-text-secondary truncate text-base font-medium';

const SubmissionCard = ({ submission }: SubmissionCardProps): JSX.Element => {
  const { id, formType, data } = submission;
  return (
    <article className="glass-panel relative flex flex-col gap-6 overflow-hidden rounded-4xl p-8">
      <header className="border-border-subtle flex w-full items-start justify-between border-b pb-4">
        <span className="text-label text-sm font-semibold">ID: #{id.slice(0, 5)}</span>
        <span
          className={`bg-accent/10 rounded-full px-3 py-1 text-sm font-semibold ${formType === 'uncontrolled' ? 'text-accent' : 'text-accent-muted'}`}
        >
          {formType}
        </span>
      </header>

      <div className="flex items-center gap-6">
        <img
          src={data.picture}
          alt={`${data.name} avatar`}
          className="border-border-subtle bg-avatar-fallback h-16 w-16 shrink-0 rounded-full border object-cover"
        />
        <h2 className="text-text-primary text-xl font-semibold">{data.name}</h2>
      </div>

      <div className="border-border-subtle mt-4 grid grid-cols-1 gap-6 border-t sm:grid-cols-2">
        <div className="mt-6">
          <h3 className={FIELD_TITLE_STYLES}>Email</h3>
          <p className={FIELD_VALUE_STYLES}>{data.email}</p>
        </div>
        <div className="mt-0 sm:mt-6">
          <h3 className={FIELD_TITLE_STYLES}>Password</h3>
          <p className={FIELD_VALUE_STYLES}>{data.password}</p>
        </div>
        <div>
          <h3 className={FIELD_TITLE_STYLES}>Age / Gender</h3>
          <p className={`${FIELD_VALUE_STYLES} capitalize`}>{`${data.age} / ${data.gender}`}</p>
        </div>
        <div>
          <h3 className={FIELD_TITLE_STYLES}>Country</h3>
          <p className={FIELD_VALUE_STYLES}>{data.country}</p>
        </div>
      </div>

      <div className="border-border-subtle mt-2 flex items-center justify-between border-t pt-3">
        <span className="text-label text-xs">Terms &amp; Conditions</span>
        <span
          className={`flex items-center gap-1 px-2 py-1 text-base font-medium ${data.terms ? 'text-success glow-green' : 'text-error glow-red'}`}
        >
          {data.terms ? '✓ Accepted' : '✗ Not Accepted'}
        </span>
      </div>
    </article>
  );
};

export default SubmissionCard;
