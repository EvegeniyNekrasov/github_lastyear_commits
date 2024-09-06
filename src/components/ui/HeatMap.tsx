import styled from 'styled-components';

const HeatMapContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeatMap = ({ children }: { children: React.ReactNode }) => {
  return <HeatMapContainer>{children}</HeatMapContainer>;
};

export default HeatMap;
