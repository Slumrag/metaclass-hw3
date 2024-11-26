import { makeAutoObservable } from 'mobx';
import LocalStorageStore from './LocalStorageStore';
import OrganizationStore from './OrganizationStore';
import QueryParamsStore from './QueryParamsStore';

class RootStore {
  constructor(
    readonly organization = new OrganizationStore(this),
    readonly query = new QueryParamsStore(this),
    readonly localStorage = new LocalStorageStore(this),
  ) {
    makeAutoObservable<RootStore>(this);
    this.organization.init();
  }
}

export default RootStore;
