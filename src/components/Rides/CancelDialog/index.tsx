'use client';
import { Icon } from '@iconify/react';
import { Button } from '@/components/common/Button';

interface CancelConfirmationDialogProps {
  onConfirm: () => void;
  onClose: () => void;
}

export const CancelConfirmationDialog = ({ onClose, onConfirm }: CancelConfirmationDialogProps) => {
  return (
    <div className="flex flex-col items-center p-2 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100/10">
        <Icon icon="mdi:alert-outline" className="text-red-500 text-4xl" />
      </div>

      <h4 className="text-lg font-bold text-text-one-100 mb-2">Are you sure?</h4>
      <p className="text-sm text-light-text-100 mb-8 max-w-70">
        This will permanently cancel your trip request. You will need to create a new one if you
        change your mind.
      </p>

      <div className="flex w-full gap-3">
        <Button
          onClick={onClose}
          className="flex-1 h-11 bg-outline-100 border border-secondary-100/30 text-light-text-100 hover:bg-secondary-100"
        >
          Go Back
        </Button>
        <Button
          type="button"
          className="flex-1 h-11 border bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-light-text-100  border-red-600/20 transition-all"
          onClick={onConfirm}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
