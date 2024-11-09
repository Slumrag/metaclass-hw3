import { makeAutoObservable } from 'mobx';
import OrganizationStore from 'store/OrganizationStore';

type PrivateFields = '_organizationStore';

class RootStore {
  constructor(private _organizationStore = new OrganizationStore()) {
    makeAutoObservable<RootStore, PrivateFields>(this);
  }

  get organizationStore() {
    return this._organizationStore;
  }
}

export default RootStore;
