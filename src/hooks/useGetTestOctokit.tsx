import { useQuery } from '@tanstack/react-query';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

const getTestData = async () => {
  try {
    const result = await octokit.request(
      'GET /repos/{owner}/{repo}/stats/commit_activity',
      {
        owner: 'EvegeniyNekrasov',
        repo: 'dotfiles',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    return result;
  } catch (error) {
    console.log(
      `Error! Status: ${error.status}. Message: ${error.response.data.message}`,
    );
  }
};

const OCTOKIT_KEY = 'yev';

export default function useGetTestOctokit() {
  const query = useQuery({
    queryKey: [OCTOKIT_KEY],
    queryFn: getTestData,
  });

  return query;
}
