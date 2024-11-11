import { SimpleUserApi } from 'App/api/githubApi/types';

export type SimpleUserModel = {
  id: SimpleUserApi['id'];
  name: SimpleUserApi['name'];
  login: SimpleUserApi['login'];
  avatarUrl: SimpleUserApi['avatar_url'];
  type: SimpleUserApi['type'];
  url: SimpleUserApi['url'];
};
export function initializeSimpleUser(): SimpleUserModel {
  return {
    id: 0,
    name: '',
    login: '',
    avatarUrl: '',
    type: '',
    url: '',
  };
}

export function normalizeSimpleUser(from: SimpleUserApi): SimpleUserModel {
  const model = {
    id: from.id,
    name: from.name,
    login: from.login,
    avatarUrl: from.avatar_url,
    type: from.type,
    url: from.url,
  };
  return model;
}
