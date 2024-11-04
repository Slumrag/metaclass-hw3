import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';
import { ArrowLeftIcon, Container, IconButton, Text } from 'components/';
import DisplayReadMe from './components/DisplayReadMe';
import { loader } from './loader/loader';
import style from './RepoPage.module.scss';

const RepoPage: React.FC = () => {
  const { repo, readme } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { org } = useParams();
  return (
    <Container className={style.container}>
      <div className={style.title}>
        <IconButton
          className={style.backButton}
          variant="transparent"
          icon={<ArrowLeftIcon width={32} height={32} />}
          onClick={() => navigate('/' + org!)}
        />
        <img src="/placeholder.png" alt="" className={style.image} />
        <Text tag={'h2'} view="title">
          {repo.name}
        </Text>
      </div>
      <DisplayReadMe src={readme.download_url!} className={style.markdown} />
    </Container>
  );
};

export default RepoPage;
