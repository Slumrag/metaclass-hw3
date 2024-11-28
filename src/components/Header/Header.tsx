import React from 'react';
import { NavLink } from 'react-router-dom';
import avatar from 'assets/avatar.png';
import { Avatar, Text } from 'components/';
import { GithubIcon } from 'components/icons';
import style from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.content}>
        <NavLink to={'/'} className={style.title}>
          <GithubIcon color="primary" />
          <Text tag="h1" weight="bold" view="p-20">
            GitHub Client
          </Text>
        </NavLink>
        {/* <Avatar variant="circle" hasBorder src={avatar} /> */}
      </div>
    </header>
  );
};

export default Header;
