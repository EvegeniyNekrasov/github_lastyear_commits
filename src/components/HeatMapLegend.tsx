import { gh_colors } from '../constants';
import Cell from './ui/Cell';
import Flex from './ui/Flex';

const HeatMapLegend: React.FC = () => {
  return (
    <Flex gap="px">
      <p>less</p>
      <Flex>
        {gh_colors.map((color: string) => (
          <Cell
            noPopOver={false}
            contributions={null}
            key={color}
            color={color}
            display={'block'}
            date={new Date()}
          />
        ))}
      </Flex>
      <p>more</p>
    </Flex>
  );
};

export default HeatMapLegend;
