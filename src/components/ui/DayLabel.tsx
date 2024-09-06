import styled from 'styled-components';

const DayLabelContainer = styled.div`
  height: 10px;
  margin-bottom: 4px;
`;

const DayLabel = ({ children }: { children: React.ReactNode }) => {
  return <DayLabelContainer>{children}</DayLabelContainer>;
};

export default DayLabel;
