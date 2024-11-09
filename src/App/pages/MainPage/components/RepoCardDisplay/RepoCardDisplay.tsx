import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text } from 'components/';
import { MinimalRepositoryModel } from 'store/models';
import RepoCard from '../RepoCard';
import style from './RepoCardDisplay.module.scss';

export type RepoCardDisplayProps = {
  className?: string;
  data: MinimalRepositoryModel[];
  onClick?: (name: string) => void;
};

const RepoCardDisplay: React.FC<RepoCardDisplayProps> = observer(({ data, className, onClick }) => {
  return (
    <div className={classNames(style.cardDisplay, className)}>
      {data.length > 0 ? (
        data.map(({ id, name, description, stargazersCount, updatedAt, owner: { avatarUrl } }) => (
          <RepoCard
            key={id}
            title={name}
            image={avatarUrl}
            subtitle={description!}
            updateTimestamp={updatedAt}
            starCount={stargazersCount!}
            onClick={onClick}
          />
        ))
      ) : (
        <Text>Not found</Text>
      )}
    </div>
  );
});

export default RepoCardDisplay;
