import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage, RepoPage, ErrorPage } from 'App/pages';
import { loader as repoPageLoader } from 'App/pages/RepoPage/loader/loader';
import Root from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        errorElement: <ErrorPage />,
        path: ':org',
        element: <MainPage />,
      },
      {
        path: ':org/:repo',
        errorElement: <ErrorPage />,
        loader: repoPageLoader,
        element: <RepoPage />,
      },
    ],
  },
]);
