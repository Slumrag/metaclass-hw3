import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage, RepoPage, ErrorPage } from 'App/pages';
import PaginationDisplay from 'App/pages/MainPage/components/PaginationDisplay';
import Root from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        path: '',
        element: <MainPage />,
        children: [{ path: ':org', element: <PaginationDisplay /> }],
      },

      {
        path: ':org/:repo',
        errorElement: <ErrorPage />,
        element: <RepoPage />,
      },
    ],
  },
]);
