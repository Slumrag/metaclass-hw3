// import { LoaderFunction } from 'react-router-typesafe';
import { makeLoader } from 'react-router-typesafe';
import { getOrgRepos } from 'App/api';
import { MinimalRepositoryDisplayProps } from '../types';

export const loader = makeLoader(async ({ params }) => {
  const { data } = await getOrgRepos(params.org!);

  const repos = data.map(
    (el) =>
      ({
        id: el.id,
        title: el.name,
        subtitle: el.description,
        updateTimestamp: el.updated_at,
        starCount: el.stargazers_count,
      }) as MinimalRepositoryDisplayProps,
  );
  return { repos };
});
