import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage, RepoPage } from 'App/pages';
import PaginationDisplay from 'App/pages/MainPage/components/PaginationDisplay';

import Root from './Root';

const ErrorPage = React.lazy(() => import('App/pages/ErrorPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: (
      <Suspense fallback={'loading error page'}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        errorElement: (
          <Suspense fallback={'loading error page'}>
            <ErrorPage />
          </Suspense>
        ),
        path: '',
        element: <MainPage />,
        children: [
          {
            path: ':org',
            element: <PaginationDisplay />,
          },
        ],
      },

      {
        path: ':org/:repo',
        errorElement: (
          <Suspense fallback={'loading error page'}>
            <ErrorPage />
          </Suspense>
        ),
        element: <RepoPage />,
      },
    ],
  },
]);
