import styled from 'styled-components';

const DayLabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;

  & > *:nth-child(odd) {
    visibility: hidden;
  }
`;

const DayLabels = ({ children }: { children: React.ReactNode }) => {
  return <DayLabelsContainer>{children}</DayLabelsContainer>;
};

export default DayLabels;
