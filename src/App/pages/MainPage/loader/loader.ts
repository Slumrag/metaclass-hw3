import { makeLoader } from 'react-router-typesafe';
import rootStore from 'store/RootStore';

export const loader = makeLoader(async ({ params }) => {
  const { organizationStore } = rootStore;
  organizationStore.getRepos(params.org!);
  return null;
});
