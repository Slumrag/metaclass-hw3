import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage, RepoPage, NotFoundPage } from 'App/pages';
import Root from './Root';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: ':org',
        element: <MainPage />,
      },
      {
        path: ':org/:repo',
        element: <RepoPage />,
      },
    ],
  },
]);
