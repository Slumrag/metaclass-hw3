import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { MainPage, RepoPage, NotFoundPage } from 'App/pages';
import { Layout } from 'components/';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
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
