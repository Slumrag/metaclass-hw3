import { makeLoader } from 'react-router-typesafe';
import { getRepoInfo, getRepoReadMe } from 'App/api';

export const loader = makeLoader(async ({ params }) => {
  const { data: repo } = await getRepoInfo(params.org!, params.repo!);
  const { data: readme } = await getRepoReadMe(params.org!, params.repo!);

  return { repo, readme };
});
