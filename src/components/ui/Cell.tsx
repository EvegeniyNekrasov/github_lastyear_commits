import { useState } from 'react';
import styled from 'styled-components';

const CellDiv = styled.div<{ $color: string; $display: string }>`
  width: 10px;
  height: 10px;
  margin: 2px;
  display: ${(props) => props.$display};
  background-color: ${(props) => props.$color};
  position: relative;
`;

const PopOverDiv = styled.div<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  position: absolute;
  top: -400%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--base-color-neutral-13);
  color: #fff;
  border-radius: 4px;
  white-space: nowrap;
  margin-top: 10px;
  padding: 6px 10px;
  width: fit-content;
  font-size: 0.75rem;
  z-index: 10;
`;

const Cell = ({
  color,
  display,
  contributions,
  noPopOver = true,
}: {
  color: string;
  display: string;
  contributions: number | null;
  noPopOver?: boolean;
}) => {
  const [isPopOverVisible, setIsPopOverVisible] = useState(false);

  const handleMouseEnter = () => setIsPopOverVisible(true);
  const handleMouseLeave = () => setIsPopOverVisible(false);

  return (
    <>
      <CellDiv
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        $color={color}
        $display={display}
      >
        <PopOverDiv $visible={isPopOverVisible && noPopOver}>
          {contributions === null || contributions === 0 ? 'No' : contributions}{' '}
          contributions on October 11h
        </PopOverDiv>
      </CellDiv>
    </>
  );
};

export default Cell;
