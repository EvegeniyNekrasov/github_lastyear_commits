import styled from 'styled-components';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridHeapMap = ({ children }: { children: React.ReactNode }) => {
  return <GridContainer>{children}</GridContainer>;
};

export default GridHeapMap;
