import { useState, useCallback } from 'react';

export type ViewMode = 'idle' | 'cancelling' | 'viewing' | 'creating';

export function useModal(initialMode: ViewMode = 'idle') {
  const [view, setView] = useState<ViewMode>(initialMode);

  const open = useCallback((mode: ViewMode) => setView(mode), []);
  const close = useCallback(() => setView('idle'), []);

  return {
    view,
    isOpen: view !== 'idle',
    open,
    close,
    isCreating: view === 'creating',
    isViewing: view === 'viewing',
    isCancelling: view === 'cancelling',
    isFormOpen: view === 'creating',
  };
}
