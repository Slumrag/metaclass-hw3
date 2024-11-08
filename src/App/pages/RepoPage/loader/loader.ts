import { makeLoader } from 'react-router-typesafe';
import { getRepoContributors, getRepoContributorsCount, getRepoInfo, getRepoLanguages, getRepoReadMe } from 'App/api';
import { FullRepositoryModel } from 'store/models';

export const loader = makeLoader(async ({ params }) => {
  const repo: FullRepositoryModel = {
    name: '',
    homepage: null,
    forks: 0,
    stars: 0,
    watchers: 0,
    topics: undefined,
    languages: [],
    contributors: [],
    contributorsCount: null,
  };

  try {
    const {
      data: { stargazers_count, forks_count, watchers_count, topics, homepage, name },
    } = await getRepoInfo(params.org!, params.repo!);

    repo.name = name;
    repo.homepage = homepage;
    repo.forks = forks_count;
    repo.stars = stargazers_count;
    repo.watchers = watchers_count;
    repo.topics = topics;

    const { data: languages } = await getRepoLanguages(params.org!, params.repo!);
    const languagesSorted = Object.entries(languages);
    languagesSorted.sort((a, b) => b[1] - a[1]);

    repo.languages = languagesSorted;

    const { data: contributors } = await getRepoContributors(params.org!, params.repo!);

    repo.contributors = contributors;

    const { data: contributorsCount } = await getRepoContributorsCount(params.org!, params.repo!);

    repo.contributorsCount = contributorsCount;

    const { data: readme } = await getRepoReadMe(params.org!, params.repo!);

    return { repo, readme };
  } catch (error) {
    console.error(error);
    return { repo };
  }
});
