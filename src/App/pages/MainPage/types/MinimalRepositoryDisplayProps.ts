import { MinimalRepositoryApi } from 'App/api/githubApi/types/schema';

export type MinimalRepositoryDisplayProps = {
  id: MinimalRepositoryApi['id'];
  title: MinimalRepositoryApi['name'];
  subtitle: MinimalRepositoryApi['description'];
  updateTimestamp: MinimalRepositoryApi['updated_at'];
  starCount: MinimalRepositoryApi['stargazers_count'];
};
