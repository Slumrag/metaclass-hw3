import { makeLoader } from 'react-router-typesafe';
import { getRepoContributors, getRepoInfo, getRepoLanguages, getRepoReadMe } from 'App/api';
import { FullRepositoryDisplayProps } from '../types';

export const loader = makeLoader(async ({ params }) => {
  const {
    data: { stargazers_count, forks_count, watchers_count, topics, homepage, name },
  } = await getRepoInfo(params.org!, params.repo!);
  const { data: languages } = await getRepoLanguages(params.org!, params.repo!);
  const { data: contributors } = await getRepoContributors(params.org!, params.repo!);
  const { data: readme } = await getRepoReadMe(params.org!, params.repo!);

  const repo: FullRepositoryDisplayProps = {
    name,
    homepage,
    forks: forks_count,
    stars: stargazers_count,
    watchers: watchers_count,
    topics,
    languages,
    contributors,
  };

  return { repo, readme };
});
