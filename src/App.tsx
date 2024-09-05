import useGetTestOctokit from './hooks/useGetTestOctokit';
import './App.css';

const App = () => {
  const { data, isFetching, error } = useGetTestOctokit();

  if (error) return <div>error...</div>;
  if (isFetching) return <div>loading...</div>;
  console.log(data?.data);
  return <div className="content">Hello Github!</div>;
};

export default App;
