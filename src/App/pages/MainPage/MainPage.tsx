import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';

import { Container, Text } from 'components/';

import Pagination from './components/Pagination';
import RepoCardDisplay from './components/RepoCardDisplay';
import SearchRepo, { type SearchParameters } from './components/SearchRepo';
import { loader } from './loader/loader';
import style from './MainPage.module.scss';

const MainPage: React.FC<React.ComponentProps<'div'>> = observer(() => {
  // const ITEMS_PER_PAGE = 9;
  const navigate = useNavigate();
  const { repos } = useLoaderData<typeof loader>();

  const handlePage = (page: number): void => {
    console.log('page', page);
    throw new Error('Function not implemented.');
  };

  const handleSubmit = function (search: SearchParameters): void {
    throw new Error('Function not implemented.');
  };

  const handleRepo = function (name: string): void {
    navigate(name);
  };

  return (
    <Container className={style.container}>
      <Text view="title" tag="h2" className={style.title}>
        List of organization repositories
      </Text>
      <SearchRepo className={style.search} onSubmit={handleSubmit} />
      <RepoCardDisplay data={repos} onClick={handleRepo} />
      <Pagination className={style.pagination} pages={10} onClick={handlePage} />
    </Container>
  );
});

export default MainPage;
