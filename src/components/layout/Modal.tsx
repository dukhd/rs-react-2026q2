import { type JSX, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  formType: string;
}

const Modal = ({ isOpen, onClose, children, formType }: ModalProps): JSX.Element | null => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const active = document.activeElement;
      if (active instanceof HTMLElement) {
        triggerRef.current = active;
      }
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="bg-bg-dark/70 glass-panel fixed inset-0 z-50 m-auto h-fit max-h-11/12 w-full max-w-2xl scrollbar-thin overflow-y-auto rounded-2xl shadow-2xl outline-none backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      onClose={() => onClose()}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      aria-modal="true"
    >
      <div className="relative flex w-full flex-col items-center gap-3 p-2 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="focus:ring-focus-ring text-text-secondary absolute top-3 right-3 cursor-pointer px-1 transition-transform duration-300 hover:scale-120 focus:ring-2"
          aria-label="Close form"
        >
          ✖
        </button>
        <h2 className="text-accent-muted text-center text-2xl font-bold capitalize sm:text-4xl">
          Let&apos;s get started!
        </h2>

        <p className="text-text-primary text-center text-sm font-medium sm:text-base">{`Fill in the details below within ${formType.toUpperCase()} form.`}</p>
        <div className="w-11/12 p-1 sm:p-5">{children}</div>
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
