import { observer } from 'mobx-react-lite';
import React, { Suspense, useEffect } from 'react';
import { Container } from 'components/';
import { RepoPageStore, rootStore } from 'store/';
import { useLocalStore } from 'utils/';
import RepoInfo from './components/RepoInfo';
import RepoNav from './components/RepoNav';
import style from './RepoPage.module.scss';

const DisplayReadMe = React.lazy(() => import('./components/DisplayReadMe'));

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
    <div className={style.wrapper}>
      <Container className={style.container} align="start">
        <RepoNav avatarUrl={repoStore.repo?.owner.avatarUrl} name={repoStore.repo?.name} />

        <RepoInfo className={style.info} repo={repoStore.repo!} />

        <Suspense>{repoStore.readme && <DisplayReadMe src={repoStore.readme} className={style.markdown} />}</Suspense>
      </Container>
    </div>
  );
});

export default RepoPage;
