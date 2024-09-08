import styled from 'styled-components';

const FlexContainer = styled.div<{
  $direction: string;
  $gap: string;
  $justifyContent: string;
}>`
    display: flex;
    flex-direction: ${(props) => props.$direction};
    gap: ${(props) => props.$gap};
    align-items: center;
    justify-content: ${(props) => props.$justifyContent};
    width: 100%;
`;

interface FlexProps {
  children: React.ReactNode;
  direction?: string;
  gap?: string;
  justifyContent?: string;
}

const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  children,
  gap = '0px',
  justifyContent = 'normal',
}) => {
  return (
    <FlexContainer
      $direction={direction}
      $gap={gap}
      $justifyContent={justifyContent}
    >
      {children}
    </FlexContainer>
  );
};

export default Flex;
