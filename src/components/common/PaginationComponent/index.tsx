'use client'
import { useHistory } from '@/hooks/useHistory';
import { Icon } from '@iconify/react';
import React, { MouseEventHandler } from 'react';
import { Button } from '../Button';

export const Pagination = ({ totalPages }: { totalPages: number }): React.ReactElement => {
  const { searchParams, handlePagination } = useHistory();
  const currentPage = Number(searchParams.get('page')) || 1;

  const previous: MouseEventHandler<HTMLButtonElement> = () => {
    handlePagination(Math.max(currentPage - 1, 1));
  };

  const next: MouseEventHandler<HTMLButtonElement> = () => {
    handlePagination(Math.min(currentPage + 1, totalPages));
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl">
      {/* Previous */}
      <Button
        onClick={previous}
        disabled={isFirstPage}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          disabled:opacity-40 disabled:cursor-not-allowed
          transition"
      >
        <Icon icon="icon-park-solid:back" />
        Prev
      </Button>

      <span className="text-md font-semibold text-text-one-100/80">
        Page <span className="font-semibold  text-black border border-black bg-secondary-100 rounded-full px-2 py-1">{currentPage}</span> of{' '}
        <span className="font-semibold text-black border border-black bg-secondary-100 rounded-full px-2 py-1">{totalPages}</span>
      </span>

      {/* Next */}
      <Button
        onClick={next}
        disabled={isLastPage}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          disabled:opacity-40 disabled:cursor-not-allowed
          transition"
      >
        Next
        <Icon icon="icon-park-solid:next" />
      </Button>
    </div>
  );
};
