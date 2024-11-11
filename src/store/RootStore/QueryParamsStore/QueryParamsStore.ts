import { makeAutoObservable } from 'mobx';
import { Params, SetURLSearchParams } from 'react-router-dom';
import RootStore from 'store/RootStore/RootStore';

type PrivateFields = '_search' | '_routeParams' | '_searchParams' | '_path' | '_setSearchParams';

export default class QueryParamsStore {
  private _routeParams: Params<string> = {};
  private _searchParams?: URLSearchParams;
  private _search: string = '';
  private _path: string = '';
  private _setSearchParams: SetURLSearchParams | null = null;
  readonly root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable<QueryParamsStore, PrivateFields>(this);
    this.root = root;
  }
  init([params, setter]: [URLSearchParams, SetURLSearchParams]) {
    this._searchParams = params;
    this._setSearchParams = setter;
  }

  setSearchParams(searchParams: Record<string, string>) {
    const newParams = Object.entries(searchParams).filter((el) => el[1] !== undefined);

    if (this._setSearchParams) {
      this._setSearchParams(newParams);
    }

    this._searchParams = new URLSearchParams(newParams);
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
