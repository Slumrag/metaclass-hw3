import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { OrgReposOptions, RepoTypeOptions } from 'App/api';
import { Container, ErrorText, Text } from 'components/';
import { rootStore } from 'store/';
import { META } from 'utils/const';

import SearchRepo, { type SearchParameters } from './components/SearchRepo';
import style from './MainPage.module.scss';

const typeFilterOptions: { key: RepoTypeOptions; value: string }[] = [
  { key: RepoTypeOptions.all, value: 'all' },
  { key: RepoTypeOptions.private, value: 'private' },
  { key: RepoTypeOptions.public, value: 'public' },
  { key: RepoTypeOptions.forks, value: 'forks' },
  { key: RepoTypeOptions.sources, value: 'sources' },
  { key: RepoTypeOptions.member, value: 'member' },
];

const MainPage: React.FC<React.ComponentProps<'div'>> = observer(() => {
  const { organization, query } = rootStore;
  const navigate = useNavigate();

  useEffect(() => {
    const org = query.getRouterParam('org');
    const type = query.getSearchParm('type') as RepoTypeOptions;
    const page = query.getSearchParm('page');
    const params: OrgReposOptions = {
      type,
      page: page ? Number(page) : undefined,
    };
    if (org && organization.meta === META.INITIAL) {
      organization.getRepos(org, params);
    }
  }, []);

  const handleSubmit = function (search: SearchParameters): void {
    if (!search.organization) return;

    organization.getRepos(search.organization, { type: search?.type as RepoTypeOptions, page: 1 }).then(() => {
      organization.addToHistory(search.organization!);

      navigate(`/${search.organization!}`);
      if (search?.type) {
        query.setSearchParams({
          type: search?.type,
        });
      }
    });
  };

  return (
    <Container className={style.container}>
      <Text view="title" tag="h2" className={style.title}>
        List of organization repositories
      </Text>
      <SearchRepo
        className={style.search}
        input={query.getRouterParam('org')}
        typeValue={{ key: query.getSearchParm('type') as string, value: query.getSearchParm('type') as string }}
        history={organization.searchHistory}
        count={organization.reposCount}
        onSubmit={handleSubmit}
        typeOptions={typeFilterOptions}
      />

      <Outlet />
      {organization.meta === META.ERROR && <ErrorText>{organization.error?.message}</ErrorText>}
    </Container>
  );
});

export default MainPage;
