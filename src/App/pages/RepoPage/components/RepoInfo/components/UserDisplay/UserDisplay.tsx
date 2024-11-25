import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text } from 'components/';
import { SimpleUserModel } from 'store/';
import UserListItem from '../UserListItem';
import style from './UserDisplay.module.scss';

export type UserDisplayProps = {
  className?: string;
  title?: string;
  users: SimpleUserModel[];
  count: number | null;
  showCounter?: boolean;
  maxCount?: number;
};

const UserDisplay: React.FC<UserDisplayProps> = observer(
  ({ className, title, users, count, showCounter = true, maxCount = 5 }) => {
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
              <UserListItem login={el.login} name={el.name!} avatar={el.avatarUrl} />
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
  },
);

export default UserDisplay;
