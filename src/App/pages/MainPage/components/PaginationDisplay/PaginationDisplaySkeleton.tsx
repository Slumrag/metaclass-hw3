import React from 'react';

import { RepoCardDisplaySkeleton } from '../RepoCardDisplay';

export type PaginationDisplayProps = React.ComponentProps<'div'>;

const PaginationDisplaySkeleton: React.FC<PaginationDisplayProps> = () => {
  return (
    <>
      <RepoCardDisplaySkeleton />
    </>
  );
};
export default PaginationDisplaySkeleton;
