import React from 'react';
import { Skeleton, Text } from 'components/';
import { range } from 'utils/';
import styleItem from '../UserListItem/UserListItem.module.scss';
import style from './UserDisplay.module.scss';

export type UserDisplaySkeletonProps = {
  count?: number;
};

const UserDisplaySkeleton: React.FC<UserDisplaySkeletonProps> = ({ count = 5 }) => {
  return (
    <div className={style.container}>
      <span className={style.header}>
        <Text className={style.title} view="p-18" weight="bold">
          {<Skeleton width={100} />}
        </Text>
      </span>
      <ul className={style.list}>
        {range(1, count).map((el) => (
          <li key={el}>
            <span className={styleItem.body}>
              <Skeleton variant="circle" width={24} height={24} />
              <Skeleton width={100} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDisplaySkeleton;
