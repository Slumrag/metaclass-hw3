import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TYPE_OPTIONS } from 'App/api/githubApi/types';
import { Container, Loader, Text } from 'components/';
import rootStore from 'store/RootStore';
import { META } from 'utils/const';
import Pagination from './components/Pagination';
import RepoCardDisplay from './components/RepoCardDisplay';
import SearchRepo, { type SearchParameters } from './components/SearchRepo';
import style from './MainPage.module.scss';

const MainPage: React.FC<React.ComponentProps<'div'>> = observer(() => {
  // const ITEMS_PER_PAGE = 9;
  const typeFilterOptions: { key: string; value: TYPE_OPTIONS }[] = [
    { key: 'private', value: TYPE_OPTIONS.private },
    { key: 'public', value: TYPE_OPTIONS.public },
    { key: 'forks', value: TYPE_OPTIONS.forks },
    { key: 'sources', value: TYPE_OPTIONS.sources },
    { key: 'member', value: TYPE_OPTIONS.member },
  ];
  const { organizationStore } = rootStore;
  const navigate = useNavigate();

  const handlePage = (page: number): void => {
    console.log('page', page);
    throw new Error('Function not implemented.');
  };

  const handleSubmit = function (search: SearchParameters): void {
    if (search.organization) {
      organizationStore.getRepos(search.organization, { type: search?.type as TYPE_OPTIONS });
    }
    // throw new Error('Function not implemented.');
  };

  const handleRepo = function (name: string): void {
    navigate(name);
  };

  return (
    <Container className={style.container}>
      <Text view="title" tag="h2" className={style.title}>
        List of organization repositories
      </Text>
      <SearchRepo className={style.search} onSubmit={handleSubmit} typeOptions={typeFilterOptions} />
      {organizationStore.meta === META.LOADING ? (
        <Loader />
      ) : (
        <RepoCardDisplay data={organizationStore.repos} onClick={handleRepo} />
      )}

      <Pagination className={style.pagination} pages={10} onClick={handlePage} />
    </Container>
  );
});

export default MainPage;
