import { useContext } from 'react';
import { RootContext } from '../RootStoreProvider';

export function useRootStore() {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
}
