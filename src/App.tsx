import { useEffect, useState } from 'react';
import type { RestApiResponse } from './types';

import ContributionHeatmap from './components/ContributionHeatmap';
import useGetContributions from './hooks/useGetContributions';

import './App.css';
import HeatMapLegend from './components/HeatMapLegend';
import Flex from './components/ui/Flex';

const App = () => {
  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [restData, setRestData] = useState<RestApiResponse[] | null>(null);
  const [heatMapHeader, setHeatMapHeader] = useState<string>('');

  const { data, isFetching, refetch } = useGetContributions(owner, repo);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setRestData(data.data as RestApiResponse[]);
      setHeatMapHeader(`${owner}/${repo}`);
      setOwner('');
      setRepo('');
    }
  }, [data, owner, repo]);

  const handleFetchData = () => {
    if (owner !== '' && repo !== '') {
      refetch();
    }
  };

  return (
    <main>
      <div className="wrapper">
        <div className="form-wrapper">
          <label>
            <span>Owner</span>
            <input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              type="text"
            />
          </label>

          <label>
            <span>Repo</span>
            <input
              value={repo}
              type="text"
              onChange={(e) => setRepo(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleFetchData}>
            search
          </button>
        </div>
        <div className="heatmap-wrapper">
          {isFetching ? <span>Loading data...</span> : null}
          {heatMapHeader !== '' ? (
            <span>
              {owner.toLocaleUpperCase()}/{repo.toLocaleUpperCase()}
            </span>
          ) : null}
          <ContributionHeatmap data={restData} />
          <Flex justifyContent="space-between">
            <a
              title="Link to Github documentation of contributions count"
              aria-label="Link to Github documentation of contributions count"
              href="https://docs.github.com/es/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_black"
            >
              Learn how Github count contributions
            </a>
            <HeatMapLegend />
          </Flex>
        </div>
      </div>
    </main>
  );
};

export default App;
