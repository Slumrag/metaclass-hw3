import React from 'react';
import { createContext, PropsWithChildren } from 'react';
import RootStore from './RootStore';
// holds a reference to the store (singleton)
let rootStore: RootStore;

// create the context
export const RootContext = createContext<RootStore | null>(null);

// create the provider component
// eslint-disable-next-line mobx/missing-observer
const RootStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  //only create the store once ( store is a singleton)
  const root = rootStore ?? new RootStore();
  // console.log(root);

  return <RootContext.Provider value={root}>{children}</RootContext.Provider>;
};

export default RootStoreProvider;
