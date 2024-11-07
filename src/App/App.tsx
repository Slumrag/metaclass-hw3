import { observer } from 'mobx-react-lite';
import React from 'react';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App: React.FC = observer(() => {
  return <RouterProvider router={router} />;
});

export default App;
