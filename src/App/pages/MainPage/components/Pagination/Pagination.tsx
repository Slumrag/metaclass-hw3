import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, Button, IconButton } from 'components/';
import { range } from 'utils/';
import style from './Pagination.module.scss';

export type PaginationProps = {
  className?: string;
  currentPage?: number;
  pages: number;
  onClick: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = observer(({ className, currentPage = 1, pages, onClick }) => {
  const CURRENT_INDEX_PADDING = 2;
  const [current, setCurrent] = useState<number>(currentPage);
  const handleNext = (): void => {
    const next = Math.min(current + 1, pages);
    setCurrent(next);
    onClick(next);
  };
  const handlePrevious = (): void => {
    const prev = Math.max(current - 1, 1);
    setCurrent(prev);

    onClick(prev);
  };

  const handleClick = (page: number): void => {
    setCurrent(page);
    onClick(page);
  };

  const renderPageButtons = () => {
    const firstPage = (
      <Button
        key={1}
        className={style.controls}
        variant={1 === current ? 'solid' : 'transparent'}
        onClick={() => handleClick(1)}
      >
        {1}
      </Button>
    );
    const lastPage = (
      <Button
        key={pages}
        className={style.controls}
        variant={pages === current ? 'solid' : 'transparent'}
        onClick={() => handleClick(pages)}
      >
        {pages}
      </Button>
    );

    const padStartIndex = Math.max(current - CURRENT_INDEX_PADDING, 2);
    const padEndIndex = Math.min(current + CURRENT_INDEX_PADDING, pages - 1);

    const currentPadded = range(padStartIndex, padEndIndex).map((page, i) => (
      <Button
        key={i}
        className={style.controls}
        variant={page === current ? 'solid' : 'transparent'}
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
        {lastPage}
      </>
    );
  };

  return (
    <div className={classNames(style.pagination, className)}>
      <IconButton
        className={style.controls}
        variant="transparent"
        icon={<ArrowLeftIcon />}
        disabled={current === 1}
        onClick={handlePrevious}
      />
      <div className={style.pageControls}>{renderPageButtons()}</div>
      <IconButton
        className={style.controls}
        variant="transparent"
        icon={<ArrowRightIcon />}
        disabled={current === pages}
        onClick={handleNext}
      />
    </div>
  );
});

export default Pagination;
