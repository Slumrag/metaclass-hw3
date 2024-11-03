import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { MainPage, RepoPage } from 'App/pages';
import { Layout } from 'components/';

export const router = createBrowserRouter([
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
