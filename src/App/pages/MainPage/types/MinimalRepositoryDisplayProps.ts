import { MinimalRepository } from 'App/api/githubApi/types/MinimalRepository';

export type MinimalRepositoryDisplayProps = {
  id: MinimalRepository['id'];
  title: MinimalRepository['name'];
  subtitle: MinimalRepository['description'];
  updateTimestamp: MinimalRepository['updated_at'];
  starCount: MinimalRepository['stargazers_count'];
};
