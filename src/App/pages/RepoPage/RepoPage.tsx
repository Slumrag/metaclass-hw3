import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container } from 'components/';
import { RepoPageStore, rootStore } from 'store/';
import { useLocalStore } from 'utils/';
import DisplayReadMe from './components/DisplayReadMe';
import RepoInfo from './components/RepoInfo';
import style from './RepoPage.module.scss';

const RepoPage: React.FC = observer(() => {
  const { query } = rootStore;
  const repoStore = useLocalStore(() => new RepoPageStore());

  useEffect(() => {
    const org = query.getRouterParam('org');
    const repo = query.getRouterParam('repo');

    if (org && repo) {
      repoStore.getRepo(org, repo);
    }
  }, []);

  return (
      <Container className={style.container} align="start">
      <RepoNav avatarUrl={repoStore.repo?.owner.avatarUrl} name={repoStore.repo?.name} />
        {repoStore.repo && <RepoInfo className={style.info} repo={repoStore.repo} />}
        {repoStore.readme && <DisplayReadMe src={repoStore.readme} className={style.markdown} />}
      </Container>
  );
});

export default RepoPage;
