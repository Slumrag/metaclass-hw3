import { makeAutoObservable } from 'mobx';
import OrganizationStore from 'store/OrganizationStore';
import QueryParamsStore from 'store/QueryParamsStore';

type PrivateFields = '_organizationStore' | '_queryParamsStore';

class RootStore {
  constructor(
    readonly organization = new OrganizationStore(this),
    readonly query = new QueryParamsStore(this),
  ) {
    makeAutoObservable<RootStore, PrivateFields>(this);
  }
}

export default RootStore;
