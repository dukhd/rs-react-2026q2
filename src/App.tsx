import { useState } from 'react';

import Button from '@/components/ui/Button';

import Header from './components/layout/Header';
import Modal from './components/layout/Modal';
import SubmissionLog from './components/layout/SubmissionLog';

type ModalType = 'uncontrolled' | 'rhf' | null;

function App() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);
  return (
    <>
      <Header />

      <main className="px-5">
        <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button type="button" text="Open uncontrolled form" onClick={() => setModalType('uncontrolled')} />
          <Button type="button" text="Open react hook form" onClick={() => setModalType('rhf')} />
        </div>

        <SubmissionLog />
      </main>
      <Modal isOpen={modalType !== null} onClose={closeModal} formType={modalType ?? ''}>
        {modalType === 'uncontrolled' && <p className="text-white">TBC: Uncontrolled form</p>}
        {modalType === 'rhf' && <p className="text-white">TBC: rhf form</p>}
      </Modal>
    </>
  );
}

export default App;
