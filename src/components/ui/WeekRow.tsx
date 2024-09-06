import styled from 'styled-components';

const WeekRowContainer = styled.div`
  display: flex;
`;

const WeekRow = ({ children }: { children: React.ReactNode }) => {
  return <WeekRowContainer>{children}</WeekRowContainer>;
};

export default WeekRow;
