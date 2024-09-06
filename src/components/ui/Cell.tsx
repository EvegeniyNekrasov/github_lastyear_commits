import styled from 'styled-components';

const CellDiv = styled.div<{ $color: string; $display: string }>`
  width: 10px;
  height: 10px;
  margin: 2px;
  display: ${(props) => props.$display};
  background-color: ${(props) => props.$color};
`;
const Cell = ({
  color,
  display,
}: {
  color: string;
  display: string;
}) => {
  return <CellDiv $color={color} $display={display} />;
};

export default Cell;
