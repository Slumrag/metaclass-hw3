import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    const [current, setCurrent] = useState<number>(currentPage);
    useEffect(() => {
      onClick(current);
    }, [current, onClick]);

    const handleNext = useCallback((): void => {
      const next = Math.min(current + 1, pages);
      setCurrent(next);
    }, [current, pages]);

    const handlePrevious = useCallback((): void => {
      const prev = Math.max(current - 1, 1);
      setCurrent(prev);
    }, [current]);

    const handleClick = useCallback((page: number): void => {
      setCurrent(page);
    }, []);

    const pageButtons = useMemo(() => {
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
    }, [current, handleClick, pages]);

    return (
      <div className={classNames(style.pagination, className)}>
        <IconButton
          className={style.controls}
          variant="transparent"
          icon={<ArrowLeftIcon />}
          disabled={current === 1}
          onClick={handlePrevious}
        />
        <div className={style.pageControls}>{pageButtons}</div>
        <IconButton
          className={style.controls}
          variant="transparent"
          icon={<ArrowRightIcon />}
          disabled={current === pages}
          onClick={handleNext}
        />
      </div>
    );
  },
);

export default PaginationControls;
