import { useState } from 'react';

import Button from '@/components/ui/Button';

import Header from './components/layout/Header';
import Modal from './components/layout/Modal';
import SubmissionLog from './components/layout/SubmissionLog';
import type { FormSchemaType } from './form/config/validation';
import ReactHookForm from './form/ReactHookForm';
import { addSubmission, type Submission } from './store/formSlice';
import { useAppDispatch } from './store/hooks';

type ModalType = 'uncontrolled' | 'react hook form' | null;

function App() {
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);

  const handleSubmit = (data: FormSchemaType, formType: Submission['formType']) => {
    const submission: Submission = {
      id: crypto.randomUUID(),
      formType,
      data: {
        ...data,
        picture: 'TBC',
      },
    };

    dispatch(addSubmission(submission));
    setModalType(null);
  };

  return (
    <>
      <Header />

      <main className="px-5">
        <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button type="button" text="Open uncontrolled form" onClick={() => setModalType('uncontrolled')} />
          <Button type="button" text="Open react hook form" onClick={() => setModalType('react hook form')} />
        </div>

        <SubmissionLog />
      </main>
      <Modal isOpen={modalType !== null} onClose={closeModal} formType={modalType ?? ''}>
        {modalType === 'uncontrolled' && <p className="text-white">TBC: Uncontrolled form</p>}
        {modalType === 'react hook form' && <ReactHookForm onSubmit={handleSubmit} />}
      </Modal>
    </>
  );
}

export default App;
