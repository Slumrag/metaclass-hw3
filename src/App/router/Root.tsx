import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'components/';
import { DEFAULT_ORG } from 'configs/api';

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(DEFAULT_ORG);
  }, []);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Root;
