import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';
import { ArrowLeftIcon, Avatar, Container, IconButton, Text } from 'components/';
import DisplayReadMe from './components/DisplayReadMe';
import RepoInfo from './components/RepoInfo';
import { loader } from './loader/loader';
import style from './RepoPage.module.scss';

const RepoPage: React.FC = () => {
  const { repo, readme } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { org } = useParams();
  return (
    <div className={style.wrapper}>
      <Container className={style.container} align="start">
        <div className={style.title}>
          <IconButton
            className={style.backButton}
            variant="transparent"
            icon={<ArrowLeftIcon width={32} height={32} />}
            onClick={() => navigate('/' + org!)}
          />
          <Avatar src="/placeholder.png" alt="" variant="rounded" />
          <Text tag={'h2'} view="title">
            {repo.name}
          </Text>
        </div>
        <RepoInfo className={style.info} {...repo} />
        {readme && <DisplayReadMe src={readme.download_url!} className={style.markdown} />}
      </Container>
    </div>
  );
};

export default RepoPage;
