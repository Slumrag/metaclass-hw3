import { makeAutoObservable, set as setMobx } from 'mobx';

import RootStore from 'store/RootStore/RootStore';

type PrivateFields = '_data' | '_keys';

class LocalStorageStore {
  readonly localStorage: Storage;
  readonly root: RootStore;
  private _data: Record<string, unknown> = {};
  private _keys: string[] = [];

  constructor(root: RootStore) {
    makeAutoObservable<LocalStorageStore, PrivateFields>(this);
    this.root = root;
    this.localStorage = localStorage;
    this.init();
  }

  public get keys(): string[] {
    return this._keys;
  }

  public get data(): Record<string, unknown> {
    return this._data;
  }

  public get size(): number {
    return this.localStorage.length;
  }

  private _getStorageKeys() {
    const size = this.localStorage.length;

    for (let index = 0; index < size; index++) {
      this._keys.push(this.localStorage.key(index)!);
    }
  }

  private _stringifyItem(item: unknown) {
    return JSON.stringify(item);
  }

  private _parseStorage() {
    this._getStorageKeys();
    for (const key of this.keys) {
      const item = this.localStorage.getItem(key);
      if (item === null) {
        return;
      }
      try {
        const parsedValue = JSON.parse(item);
        setMobx(this._data, { [key]: parsedValue });
      } catch {
        setMobx(this._data, { [key]: item });
      }
    }
  }

  init() {
    this._parseStorage();
  }

  get(key: string) {
    return this._data[key];
  }

  set(key: string, value: unknown) {
    setMobx(this._data, { [key]: value });
    this.localStorage.setItem(key, this._stringifyItem(value));
  }

  delete(key: string) {
    delete this._data[key];
    this.localStorage.removeItem(key);
  }

  clear() {
    this._keys = [];
    this._data = {};
    this.localStorage.clear();
  }
}

export default LocalStorageStore;
