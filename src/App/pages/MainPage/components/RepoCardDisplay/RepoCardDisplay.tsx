import classNames from 'classnames';
import React from 'react';
import { MinimalRepositoryDisplayProps } from '../../types';
import RepoCard from '../RepoCard';
import style from './RepoCardDisplay.module.scss';

export type RepoCardDisplayProps = {
  className?: string;
  data: MinimalRepositoryDisplayProps[];
  onClick?: (name: string) => void;
};

const RepoCardDisplay: React.FC<RepoCardDisplayProps> = ({ data, className, onClick }) => {
  return (
    <div className={classNames(style.cardDisplay, className)}>
      {data.map(({ id, title, subtitle, starCount, updateTimestamp }) => (
        <RepoCard
          key={id}
          title={title}
          subtitle={subtitle!}
          updateTimestamp={updateTimestamp!}
          starCount={starCount!}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default RepoCardDisplay;
