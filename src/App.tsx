import Button from '@/components/Button';

import Header from './components/Header';
import SubmissionLog from './components/SubmissionLog';

function App() {
  return (
    <>
      <Header />

      <main className="px-5">
        <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button type="button" text="Open uncontrolled form" onClick={() => {}} />
          <Button type="button" text="Open react hook form" onClick={() => {}} />
        </div>

        <SubmissionLog />
      </main>
    </>
  );
}

export default App;
