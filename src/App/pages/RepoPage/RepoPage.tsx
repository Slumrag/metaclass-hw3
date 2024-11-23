import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, Avatar, Container, IconButton, Text } from 'components/';
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

  const navigate = useNavigate();
  return (
    <div className={style.wrapper}>
      <Container className={style.container} align="start">
        <div className={style.title}>
          <IconButton
            className={style.backButton}
            variant="transparent"
            icon={<ArrowLeftIcon />}
            onClick={() => navigate(-1)}
          />
          <Avatar src={repoStore.repo?.owner.avatarUrl ?? '/placeholder.png'} alt="" variant="rounded" />
          <Text tag={'h2'} view="title" className={style.text}>
            {repoStore.repo?.name}
          </Text>
        </div>
        {repoStore.repo && <RepoInfo className={style.info} repo={repoStore.repo} />}
        {repoStore.readme && <DisplayReadMe src={repoStore.readme} className={style.markdown} />}
      </Container>
    </div>
  );
});

export default RepoPage;
