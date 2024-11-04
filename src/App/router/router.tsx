import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage, RepoPage, NotFoundPage } from 'App/pages';
import { loader as mainPageLoader } from 'App/pages/MainPage/loader/loader';
import { loader as repoPageLoader } from 'App/pages/RepoPage/loader/loader';
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
        index: true,
        errorElement: <span>some err</span>,
        path: ':org',
        loader: mainPageLoader,
        element: <MainPage />,
      },
      {
        path: ':org/:repo',
        errorElement: <span>some err</span>,
        loader: repoPageLoader,
        element: <RepoPage />,
      },
    ],
  },
]);
