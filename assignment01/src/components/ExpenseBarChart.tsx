import { ExpenseType } from '@/types';
import { getExpenseTypeIcon } from '@/utils';
import { Icon, config } from '@gluestack-ui/themed';
import { Defs, G, LinearGradient, Stop } from 'react-native-svg';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';

export type ExpenseSumByType = { x: ExpenseType; y: number };

export interface ExpenseBarChartProps {
  data: ExpenseSumByType[];
}

/**
 * Component that renders a bar chart of expenses by type.
 */
const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ data }) => {

  return (
    <VictoryChart
      animate={{
        duration: 500,
        onLoad: {
          duration: 300,
        },
        easing: 'cubic',
      }}
    >
      <Defs>
        <LinearGradient id='bar_chart_gradient' x2='0%' y2='100%'>
          <Stop
            offset='10%'
            stopColor={config.theme.tokens.colors.primary500}
          />
          <Stop
            offset='90%'
            stopColor={config.theme.tokens.colors.primary300}
          />
        </LinearGradient>
      </Defs>

      <VictoryAxis
        style={{
          axis: { stroke: 'transparent' },
        }}
        tickLabelComponent={<TickLabelComponent data={data} />}
      />

      <VictoryBar
        cornerRadius={8}
        barWidth={60}
        padding={0}
        style={{
          data: {
            fill: 'url(#bar_chart_gradient)',
          },
          labels: {},
        }}
        data={data}
      />
    </VictoryChart>
  );
};

interface TickLabelComponentProps {
  x?: number;
  y?: number;
  datum?: number;
  data: ExpenseSumByType[];
}

/**
 * Component rendering an SVG icon for tick labels instead of regular text labels.
 */
const TickLabelComponent: React.FC<TickLabelComponentProps> = ({
  x,
  y,
  datum,
  data,
}) => {
  return (
    <G x={(x ?? 0) - 10} y={y}>
      <Icon as={getExpenseTypeIcon(data[(datum ?? 1) - 1].x)} />
    </G>
  );
};

export default ExpenseBarChart;
