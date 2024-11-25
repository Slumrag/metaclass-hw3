import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { IconButton, ArrowLeftIcon, Avatar, Text } from 'components/';
import style from './RepoNav.module.scss';

export type RepoNavProps = {
  avatarUrl?: string;
  name?: string;
};
const RepoNav: React.FC<RepoNavProps> = ({ avatarUrl, name }) => {
  const params = useParams();
  return (
    <div className={style.title}>
      <NavLink to={'/' + params.org}>
        <IconButton className={style.backButton} variant="transparent" icon={<ArrowLeftIcon />} />
      </NavLink>
      <Avatar src={avatarUrl} alt="organization avatar" variant="rounded" />
      <Text tag={'h2'} view="title" className={style.text}>
        {name}
      </Text>
    </div>
  );
};
export default RepoNav;
