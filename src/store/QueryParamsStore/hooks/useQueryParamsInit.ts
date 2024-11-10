import { runInAction } from 'mobx';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useRootStore } from 'store/RootStore';

export const useQueryParamsStoreInit = () => {
  const { pathname, search } = useLocation();
  const params = useParams();
  const args = useSearchParams();
  const rootStore = useRootStore();
  // console.log(search);
  // console.count('useQueryParams');
  rootStore.query.setPath(pathname);
  runInAction(() => {
    rootStore.query.setRouterParams(params);
    rootStore.query.setSearchParams(args[0]);
  });
  rootStore.query.setSearch(search);
  return args;
};
