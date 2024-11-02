import React from 'react';
import RepoCard from '../RepoCard';
import style from './RepoCardDisplay.module.scss';

type Repo = {
  title: string;
  subtitle: string;
  updateTimestamp: string;
  starCount: number;
};

export type RepoCardDisplayProps = {
  data: Repo[];
};

const RepoCardDisplay: React.FC<RepoCardDisplayProps> = ({ data }) => {
  return (
    <div className={style.cardDisplay}>
      {data.map((repo, i) => (
        <RepoCard key={i} {...repo} />
      ))}
    </div>
  );
};

export default RepoCardDisplay;
