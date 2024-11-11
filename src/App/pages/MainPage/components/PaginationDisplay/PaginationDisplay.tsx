import { observer } from 'mobx-react-lite';
import React from 'react';
import { ErrorText } from 'components/';
import { MinimalRepositoryModel } from 'store/';
import PaginationControls from '../PaginationControls';
import RepoCardDisplay from '../RepoCardDisplay';
import style from './PaginationDisplay.module.scss';

export type PaginationDisplayProps = {
  repos: MinimalRepositoryModel[];
  pages: number;
  currentPage?: number;
  handleCardClick: (name: string) => void;
  handlePage: (page: number) => void;
};

const PaginationDisplay: React.FC<PaginationDisplayProps> = observer(
  ({ repos, pages, currentPage, handleCardClick, handlePage }) => {
    return (
      <>
        {repos.length > 0 ? (
          <RepoCardDisplay data={repos} onClick={handleCardClick} />
        ) : (
          <ErrorText>Not found</ErrorText>
        )}
        {pages && pages > 1 && (
          <PaginationControls
            className={style.pagination}
            pages={pages}
            currentPage={currentPage}
            onClick={handlePage}
          />
        )}
      </>
    );
  },
);
export default PaginationDisplay;
