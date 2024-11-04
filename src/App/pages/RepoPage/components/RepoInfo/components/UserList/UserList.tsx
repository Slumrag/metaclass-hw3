import classNames from 'classnames';
import React from 'react';
import { SimpleUser } from 'App/api/githubApi/types';
import { Text } from 'components/';
import UserDisplay from '../UserDisplay';
import style from './UserList.module.scss';

export type UserListProps = {
  className?: string;
  title?: string;
  users: SimpleUser[];
  showCounter?: boolean;
  maxCount?: number;
};

const UserList: React.FC<UserListProps> = ({ className, title, users, showCounter = true, maxCount = 5 }) => {
  return (
    <div className={classNames(style.container, className)}>
      <Text className={style.title} view="p-18" weight="bold">
        {title}
        {showCounter && <span className={style.counter}>{users.length}</span>}
      </Text>
      <ul className={style.list}>
        {users.slice(0, maxCount).map((el) => (
          <li key={el.id}>
            <UserDisplay login={el.login} name={el.name!} avatar={el.avatar_url} />
          </li>
        ))}
        {users.length > maxCount && (
          <li>
            <Text>...and {users.length - maxCount} others</Text>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
