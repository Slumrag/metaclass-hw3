import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Avatar, Skeleton, Text } from 'components/';
import style from './UserListItem.module.scss';

export type UserListItemProps = {
  className?: string;
  login?: string;
  /** ссылка на аватар */
  avatar?: string;
  name?: string;
};

const UserListItem: React.FC<UserListItemProps> = observer(({ className, login, avatar, name }) => {
  return (
    <div className={classNames(style.body, className)}>
      {avatar && <Avatar src={avatar} alt={login} variant="circle" hasBorder />}
      <Text weight="bold">{login !== undefined ? login : <Skeleton />}</Text>
      {name && <Text color="secondary">{name}</Text>}
    </div>
  );
});

export default UserListItem;
