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
  count: number | null;
  showCounter?: boolean;
  maxCount?: number;
};

const UserList: React.FC<UserListProps> = ({ className, title, users, count, showCounter = true, maxCount = 5 }) => {
  const localCount = count ?? users.length;
  return (
    <div className={classNames(style.container, className)}>
      <span className={style.header}>
        <Text className={style.title} view="p-18" weight="bold">
          {title}
        </Text>
        {showCounter && <span className={style.counter}>{localCount}</span>}
      </span>
      <ul className={style.list}>
        {users.slice(0, maxCount).map((el) => (
          <li key={el.id}>
            <UserDisplay login={el.login} name={el.name!} avatar={el.avatar_url} />
          </li>
        ))}
        {localCount > maxCount && (
          <li>
            <Text>...and {localCount - maxCount} others</Text>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
