import { useQuery } from '@tanstack/react-query';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

const getTestData = async () => {
  try {
    const result = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'octocat',
      repo: 'Spoon-Knife',
    });
    return result;
  } catch (error) {
    console.log(
      `Error! Status: ${error.status}. Message: ${error.response.data.message}`,
    );
  }
};

const OCTOKIT_KEY = 'test_oktokit';

export default function useGetTestOctokit() {
  const query = useQuery({
    queryKey: [OCTOKIT_KEY],
    queryFn: getTestData,
  });

  return query;
}
