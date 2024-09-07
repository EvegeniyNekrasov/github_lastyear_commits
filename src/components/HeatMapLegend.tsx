import { gh_colors } from '../constants';
import Cell from './ui/Cell';
import Flex from './ui/Flex';

const HeatMapLegend: React.FC = () => {
  return (
    <Flex gap="8px">
      <p>less</p>
      <Flex>
        {gh_colors.map((color: string) => (
          <Cell key={color} color={color} display={'block'} />
        ))}
      </Flex>
      <p>more</p>
    </Flex>
  );
};

export default HeatMapLegend;
