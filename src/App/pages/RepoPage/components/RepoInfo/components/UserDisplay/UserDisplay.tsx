import classNames from 'classnames';
import React from 'react';
import { Avatar, Text } from 'components/';
import style from './UserDisplay.module.scss';

export type UserDisplayProps = {
  className?: string;
  login: string;
  /** ссылка на аватар */
  avatar?: string;
  name?: string;
};

const UserDisplay: React.FC<UserDisplayProps> = ({ className, login, avatar, name }) => {
  return (
    <div className={classNames(style.body, className)}>
      {avatar && <Avatar src={avatar} alt={login} variant="circle" />}
      <Text weight="bold">{login}</Text>
      {name && <Text color="secondary">{name}</Text>}
    </div>
  );
};

export default UserDisplay;
