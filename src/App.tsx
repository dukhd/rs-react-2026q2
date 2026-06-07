import { useState } from 'react';

import Button from '@/components/ui/Button';

import Header from './components/layout/Header';
import Modal from './components/layout/Modal';
import SubmissionLog from './components/layout/SubmissionLog';
import type { FormSchemaType } from './form/config/validation';
import ReactHookForm from './form/ReactHookForm';
import UncontrolledForm from './form/UncontrolledForm';
import { addSubmission, type Submission } from './store/formSlice';
import { useAppDispatch } from './store/hooks';
import { convertToBase64 } from './utils/fileToBase64';

type ModalType = 'uncontrolled' | 'react hook form' | null;

function App() {
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);

  const handleSubmit = async (data: FormSchemaType, formType: Submission['formType']) => {
    try {
      const picture = data.picture?.[0];
      const base64Picture = picture ? await convertToBase64(picture) : '';
      const submission: Submission = {
        id: crypto.randomUUID(),
        formType,
        data: {
          ...data,
          picture: base64Picture,
        },
      };

      dispatch(addSubmission(submission));
      setModalType(null);
    } catch (error) {
      console.error('Error during image conversion:', error);
    }
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
        {modalType === 'uncontrolled' && <UncontrolledForm onSubmit={handleSubmit} />}
        {modalType === 'react hook form' && <ReactHookForm onSubmit={handleSubmit} />}
      </Modal>
    </>
  );
}

export default App;
