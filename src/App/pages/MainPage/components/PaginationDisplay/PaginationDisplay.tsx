import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorText } from 'components/';
import { rootStore } from 'store/';
import PaginationControls from '../PaginationControls';
import RepoCardDisplay from '../RepoCardDisplay';
import style from './PaginationDisplay.module.scss';

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
      {organization.data.length > 0 ? (
        <RepoCardDisplay data={organization.data} onClick={handleRepo} />
      ) : (
        <ErrorText>Not found</ErrorText>
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
