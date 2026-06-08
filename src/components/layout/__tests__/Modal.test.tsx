import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';

import Modal from '../Modal';

describe('Modal Component', () => {
  const mockOnClose = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    formType: 'react hook form',
  };

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.open = false;
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderModal = (
    propsOverrides: Partial<React.ComponentProps<typeof Modal>> = {},
    children: React.ReactNode = <div>Content</div>
  ) => {
    const testTriggerRef: { current: HTMLButtonElement | null } = { current: null };

    const combinedProps = {
      ...defaultProps,
      triggerRef: testTriggerRef,
      ...propsOverrides,
    };

    const renderResult = render(
      <>
        <button ref={testTriggerRef}>Trigger Button</button>
        <Modal {...combinedProps}>{children}</Modal>
      </>
    );

    const update = (newOverrides: Partial<React.ComponentProps<typeof Modal>> = {}) => {
      renderResult.rerender(
        <>
          <button ref={testTriggerRef}>Trigger Button</button>
          <Modal {...combinedProps} {...newOverrides}>
            {children}
          </Modal>
        </>
      );
    };

    return { ...renderResult, update, testTriggerRef };
  };

  test('Should open when isOpen is true and call onClose when close button is clicked', async () => {
    renderModal();

    expect(screen.getByRole('heading')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /Close form/i });
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Should not render when isOpen is false', () => {
    renderModal({ isOpen: false });

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('Should meet accessibility criteria (aria-modal attribute and returning focus)', () => {
    const { update, testTriggerRef } = renderModal();

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    update({ isOpen: false });

    expect(document.activeElement).toBe(testTriggerRef.current);
  });

  test('Should render via portal inside the document body tag', () => {
    renderModal({}, <div data-testid="portal-child">Portal Test</div>);

    const childElement = screen.getByTestId('portal-child');
    const dialogElement = childElement.closest('dialog');

    expect(dialogElement?.parentElement).toBe(document.body);
  });

  test('Should call onClose when Escape key is pressed', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');

    fireEvent.keyDown(dialog, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Should call onClose when clicking directly on the backdrop', async () => {
    renderModal();

    const dialog = screen.getByRole('dialog');
    await userEvent.click(dialog);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Should not call onClose when clicking inside the modal content box', async () => {
    renderModal({}, <div data-testid="inner-click">Click Me</div>);

    const innerElement = screen.getByTestId('inner-click');

    await userEvent.click(innerElement);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
