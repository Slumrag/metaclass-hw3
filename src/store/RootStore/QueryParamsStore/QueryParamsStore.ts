import { makeAutoObservable, observable } from 'mobx';
import { Params } from 'react-router-dom';
import RootStore from 'store/RootStore/RootStore';

type PrivateFields = '_search' | '_routeParams' | '_searchParams' | '_path';

export default class QueryParamsStore {
  private _routeParams: Params<string> = {};
  private _searchParams?: URLSearchParams;
  private _search: string = '';
  private _path: string = '';
  readonly root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable<QueryParamsStore, PrivateFields>(this, {
      _search: true,
      _routeParams: observable,
      _searchParams: true,
      _path: observable,
      // getSearchParm: observable,
    });
    this.root = root;
  }

  setSearchParams(searchParams: URLSearchParams) {
    this._searchParams = searchParams;
  }

  setRouterParams(params: Params<string>) {
    this._routeParams = params;
  }

  setPath(path: string) {
    this._path = path;
  }

  get searchParams() {
    return this._searchParams;
  }

  get routerParams() {
    return this._routeParams;
  }

  get path() {
    return this._path;
  }

  getSearchParm(key: string): string | undefined {
    const param = this._searchParams?.get(key);
    return param ?? undefined;
  }

  getRouterParam(key: string): string | undefined {
    return this._routeParams[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
    }
  }
}
