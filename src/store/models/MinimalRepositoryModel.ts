import dayjs, { Dayjs } from 'dayjs';
import { MinimalRepositoryApi } from 'App/api/githubApi/types/schema';
import { normalizeSimpleUser, SimpleUserModel } from './SimpleUserModel';

export type MinimalRepositoryModel = {
  id: MinimalRepositoryApi['id'];
  name: MinimalRepositoryApi['name'];
  description: MinimalRepositoryApi['description'];
  updatedAt?: Dayjs | null;
  stargazersCount: MinimalRepositoryApi['stargazers_count'];
  owner: SimpleUserModel;
};

export function normalizeMinimalRepository(from: MinimalRepositoryApi): MinimalRepositoryModel {
  const model: MinimalRepositoryModel = {
    id: from.id,
    name: from.name,
    description: from.description,
    updatedAt: from.updated_at ? dayjs(from.updated_at) : null,
    stargazersCount: from.stargazers_count,
    owner: normalizeSimpleUser(from.owner),
  };
  return model;
}
