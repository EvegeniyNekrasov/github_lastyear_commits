import { useQuery } from '@tanstack/react-query';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

const getTestData = async (owner: string, repo: string) => {
  try {
    const result = await octokit.request(
      'GET /repos/{owner}/{repo}/stats/commit_activity',
      {
        owner: owner,
        repo: repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    return await result;
  } catch (error) {
    console.log(
      `Error! Status: ${error.status}. Message: ${error.response.data.message}`,
    );
  }
};

const OCTOKIT_KEY = 'gh_response';

export default function useGetContributions(owner: string, repo: string) {
  const query = useQuery({
    queryKey: [OCTOKIT_KEY],
    refetchOnWindowFocus: false,
    queryFn: () => getTestData(owner, repo),
    enabled: false,
  });

  return query;
}
