import { useEffect, useState } from 'react';
import type { RestApiResponse } from './types';

import { SearchIcon } from '@primer/octicons-react';
import styled from 'styled-components';

import ContributionHeatmap from './components/ContributionHeatmap';
import useGetContributions from './hooks/useGetContributions';

import './App.css';
import HeatMapLegend from './components/HeatMapLegend';
import Banner from './components/ui/Banner';
import Flex from './components/ui/Flex';
import LoadingSpinner from './components/ui/LoadingSpinner';

const App = () => {
  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [restData, setRestData] = useState<RestApiResponse[] | null>(null);

  const { data, isFetching, refetch } = useGetContributions(
    owner.trim(),
    repo.trim(),
  );

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setRestData(data.data as RestApiResponse[]);
    }
  }, [data]);

  const handleFetchData = () => {
    if (owner !== '' && repo !== '') {
      refetch();
      setOwner('');
      setRepo('');
    }
  };

  return (
    <main>
      <div className="wrapper">
        <Banner>
          <span style={{ width: '80ch' }}>
            This projects can only be used for repositories with fewer than{' '}
            <b>10,000 commits</b>. For more details visit:{' '}
            <a
              style={{ color: 'var(--base-color-blue-5)' }}
              href="https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28"
              rel="noreferrer"
              target="_blank"
            >
              Github REST API docs
            </a>
          </span>
        </Banner>
        <div className="form-wrapper">
          <label>
            <span>Owner</span>
            <input
              value={owner}
              placeholder="owner name..."
              onChange={(e) => setOwner(e.target.value)}
              type="text"
            />
          </label>

          <label>
            <span>Repo</span>
            <input
              value={repo}
              placeholder='repo name...'
              type="text"
              onChange={(e) => setRepo(e.target.value)}
            />
          </label>
          <button disabled={isFetching} type="button" onClick={handleFetchData}>
            {isFetching ? (
              <Flex gap="8px" justifyContent="center">
                <LoadingSpinner />
                <span>Loading...</span>
              </Flex>
            ) : (
              <Flex justifyContent="center" gap="12px">
                <SearchIcon size={16} />
                <span>Search</span>
              </Flex>
            )}
          </button>
        </div>
        <div className="heatmap-wrapper">
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
