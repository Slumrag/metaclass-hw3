import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorText } from 'components/';
import { rootStore } from 'store/';
import { META } from 'utils/';
import PaginationControls from '../PaginationControls';
import style from './PaginationDisplay.module.scss';

const RepoCardDisplay = React.lazy(() => import('../RepoCardDisplay'));

export type PaginationDisplayProps = React.ComponentProps<'div'>;

const PaginationDisplay: React.FC<PaginationDisplayProps> = observer(() => {
  const { organization, query } = rootStore;
  const navigate = useNavigate();

  const handlePage = (page: number): void => {
    organization.goToPage(page).then(() => {
      query.setSearchParams({ type: query.getSearchParm('type') as string, page: page.toString() });
    });
  };

  const handleRepo = function (name: string): void {
    navigate(name);
  };

  return (
    <>
      <RepoCardDisplay data={organization.data} onClick={handleRepo} />
      {(organization.meta === META.SUCCESS && organization.data.length) === 0 && (
        <ErrorText>No repositories were found</ErrorText>
      )}

      {organization.pages && organization.pages > 1 && (
        <PaginationControls
          className={style.pagination}
          pages={organization.pages}
          currentPage={organization.currentPage}
          onClick={handlePage}
        />
      )}
    </>
  );
});
export default PaginationDisplay;
