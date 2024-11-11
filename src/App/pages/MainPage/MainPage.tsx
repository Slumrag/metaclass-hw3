import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OrgReposOptions } from 'App/api';
import { TYPE_OPTIONS } from 'App/api/githubApi/types';
import { Container, Loader, Text } from 'components/';
import { useRootStore } from 'store/RootStore';
import { META } from 'utils/const';
import PaginationControls from './components/PaginationControls';
import RepoCardDisplay from './components/RepoCardDisplay';
import SearchRepo, { type SearchParameters } from './components/SearchRepo';
import style from './MainPage.module.scss';

const MainPage: React.FC<React.ComponentProps<'div'>> = observer(() => {
  const { organization, query } = useRootStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  useEffect(() => {
    const org = query.getRouterParam('org');
    const type = query.getSearchParm('type') as TYPE_OPTIONS;
    const page = query.getSearchParm('page');
    const params: OrgReposOptions = {
      type,
      page: page ? Number(page) : undefined,
    };
    if (org) {
      organization.getRepos(org, params);
    }
  }, []);

  const typeFilterOptions: { key: TYPE_OPTIONS; value: string }[] = [
    { key: TYPE_OPTIONS.all, value: 'all' },
    { key: TYPE_OPTIONS.private, value: 'private' },
    { key: TYPE_OPTIONS.public, value: 'public' },
    { key: TYPE_OPTIONS.forks, value: 'forks' },
    { key: TYPE_OPTIONS.sources, value: 'sources' },
    { key: TYPE_OPTIONS.member, value: 'member' },
  ];
  const navigate = useNavigate();

  const handlePage = (page: number): void => {
    organization.goToPage(page).then(() => {
      setSearchParams({ page: page.toString() });
    });
  };

  const handleSubmit = function (search: SearchParameters): void {
    if (search.organization) {
      organization.getRepos(search.organization, { type: search?.type as TYPE_OPTIONS }).then(() => {
        navigate(`/${search.organization!}`);
        if (search?.type) {
          setSearchParams({ type: search?.type });
        }
      });
    }
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
      {organization.meta === META.LOADING && <Loader />}

      {organization.meta === META.SUCCESS && (
        <>
          <RepoCardDisplay data={organization.data} onClick={handleRepo} />
          {organization.pages && organization.pages > 1 && (
            <PaginationControls
              className={style.pagination}
              pages={organization.pages}
              currentPage={organization.currentPage}
              onClick={handlePage}
            />
          )}
        </>
      )}
      {organization.meta === META.ERROR && <Text>Ошибка</Text>}
    </Container>
  );
});

export default MainPage;
