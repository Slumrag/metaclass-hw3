import { runInAction } from 'mobx';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { rootStore } from 'store/RootStore';

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();
  const params = useParams();
  const args = useSearchParams();

  runInAction(() => {
    rootStore.query.init(args);
    rootStore.query.setRouterParams(params);
  });
  rootStore.query.setSearch(search);
};
