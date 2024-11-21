import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, Button, IconButton } from 'components/';
import { range } from 'utils/';
import style from './PaginationControls.module.scss';

export type PaginationControlsProps = {
  className?: string;
  currentPage?: number;
  pages: number;
  onClick: (page: number) => void;
};

const PaginationControls: React.FC<PaginationControlsProps> = observer(
  ({ className, currentPage = 1, pages, onClick }) => {
    const CURRENT_INDEX_PADDING = 2;
    const handleClick = (page: number): void => {
      onClick(page);
    };

    const handleNext = (): void => {
      const next = Math.min(currentPage + 1, pages);
      handleClick(next);
    };

    const handlePrevious = (): void => {
      const prev = Math.max(currentPage - 1, 1);
      handleClick(prev);
    };

    const pageButtons = () => {
      const firstPage = (
        <Button
          key={'first'}
          className={style.controls}
          variant={1 === currentPage ? 'solid' : 'transparent'}
          onClick={() => handleClick(1)}
        >
          {1}
        </Button>
      );
      const lastPage = (
        <Button
          key={'last'}
          className={style.controls}
          variant={pages === currentPage ? 'solid' : 'transparent'}
          onClick={() => handleClick(pages)}
        >
          {pages}
        </Button>
      );

      const padStartIndex = Math.max(currentPage - CURRENT_INDEX_PADDING, 2);
      const padEndIndex = Math.min(currentPage + CURRENT_INDEX_PADDING, pages - 1);

      const currentPadded = range(padStartIndex, padEndIndex).map((page, i) => (
        <Button
          key={i}
          className={style.controls}
          variant={page === currentPage ? 'solid' : 'transparent'}
          onClick={() => handleClick(page)}
        >
          {page}
        </Button>
      ));

      return (
        <>
          {firstPage}
          {padStartIndex - 1 >= CURRENT_INDEX_PADDING && '...'}
          {currentPadded}
          {pages - padEndIndex >= CURRENT_INDEX_PADDING && '...'}
          {pages > 1 && lastPage}
        </>
      );
    };

    return (
      <div className={classNames(style.pagination, className)}>
        <IconButton
          className={style.controls}
          variant="transparent"
          icon={<ArrowLeftIcon />}
          disabled={currentPage === 1}
          onClick={handlePrevious}
        />
        <div className={style.pageControls}>{pageButtons()}</div>
        <IconButton
          className={style.controls}
          variant="transparent"
          icon={<ArrowRightIcon />}
          disabled={currentPage === pages}
          onClick={handleNext}
        />
      </div>
    );
  },
);

export default PaginationControls;
