import { runInAction } from 'mobx';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useRootStore } from 'store/RootStore';

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();
  const params = useParams();
  const args = useSearchParams();
  const rootStore = useRootStore();

  runInAction(() => {
    rootStore.query.init(args);
    rootStore.query.setRouterParams(params);
  });
  rootStore.query.setSearch(search);
};
