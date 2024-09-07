import { useEffect, useState } from 'react';
import type { RestApiResponse } from './types';

import ContributionHeatmap from './components/ContributionHeatmap';
import useGetContributions from './hooks/useGetContributions';

import './App.css';

const App = () => {
  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const { data, isFetching, refetch } = useGetContributions(owner, repo);
  const [restData, setRestData] = useState<RestApiResponse[] | null>(null);

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
        {isFetching ? <span>loading...</span> : null}
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
          <p>Current year: {new Date().getFullYear()}</p>
          <ContributionHeatmap data={restData} />
        </div>
      </div>
    </main>
  );
};

export default App;
