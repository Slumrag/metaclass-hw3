import React from 'react';
import avatar from 'assets/avatar.png';
import { Text } from 'components/';
import { GithubIcon } from 'components/icons';
import style from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.content}>
        <div className={style.title}>
          <GithubIcon color="primary" />
          <Text tag="h1" weight="bold" view="p-20">
            GitHub Client
          </Text>
        </div>
        <img className={style.avatar} src={avatar} />
      </div>
    </header>
  );
};

export default Header;
