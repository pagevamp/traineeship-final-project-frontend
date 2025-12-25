import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ title, children, open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <div className="flex items-center justify-center">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
