import React from 'react';
import { FullRepositoryDisplayProps } from '../../types';

export type RepoInfoProps = FullRepositoryDisplayProps & {
  className?: string;
};

const RepoInfo: React.FC<RepoInfoProps> = ({ homepage, forks, stars, watchers, topics, languages, contributors }) => {
  return (
    <div>
      {homepage}
      {topics && <div className="">{topics?.map((el, i) => <span key={i}>{el}</span>)}</div>}
      <div className="">
        forks {forks}
        stars {stars}
        watchers {watchers}
      </div>
      {contributors && (
        <ul className="">
          {contributors.map((el) => (
            <li key={el.id}>{el.login + ' ' + el?.name}</li>
          ))}
        </ul>
      )}
      {languages && (
        <ul>
          {Object.entries(languages).map(([lang, lines]) => (
            <li key={lang}>
              {lang}:{lines}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepoInfo;
