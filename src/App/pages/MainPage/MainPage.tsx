import React, { useEffect, useState } from 'react';
import { getOrgRepos } from 'App/api';
import { RepositoryDisplayProps } from 'App/pages/MainPage/types';
import { Container, Text } from 'components/';

import { DEFAULT_ORG } from 'configs/api';
import Pagination from './components/Pagination';
import RepoCardDisplay from './components/RepoCardDisplay';
import SearchRepo, { type SearchParameters } from './components/SearchRepo';
import style from './MainPage.module.scss';

const MainPage: React.FC<React.ComponentProps<'div'>> = () => {
  const ITEMS_PER_PAGE = 9;

  const [repos, setRepos] = useState<RepositoryDisplayProps[]>([]);
  useEffect(() => {
    getOrgRepos(DEFAULT_ORG)
      .then((result) => {
        setRepos(
          result.data.map((el) => ({
            id: el.id,
            title: el.name,
            subtitle: el.description,
            updateTimestamp: el.updated_at,
            starCount: el.stargazers_count,
          })),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handlePage = (page: number): void => {
    console.log('page', page);
    // throw new Error('Function not implemented.');
  };

  const handleSubmit = function (search: SearchParameters): void {
    throw new Error('Function not implemented.');
  };

  const handleRepo = function (name: string): void {
    console.log('repo', name);
    // throw new Error('Function not implemented.');
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
};

export default MainPage;
