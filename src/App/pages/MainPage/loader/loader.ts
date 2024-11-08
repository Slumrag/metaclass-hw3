// import { LoaderFunction } from 'react-router-typesafe';
import { makeLoader } from 'react-router-typesafe';
import { getOrgRepos } from 'App/api';
import { MinimalRepositoryModel } from 'store/models';

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
      }) as MinimalRepositoryModel,
  );
  return { repos };
});
