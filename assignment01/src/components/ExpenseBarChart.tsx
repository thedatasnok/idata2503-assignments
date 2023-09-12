import { useExpenseStore } from '@/store';
import { ExpenseType } from '@/types';
import { getExpenseTypeIcon } from '@/utils';
import { Icon, config } from '@gluestack-ui/themed';
import { Defs, G, LinearGradient, Stop } from 'react-native-svg';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';

type ExpenseSumByType = { x: ExpenseType; y: number };

const ExpenseBarChart = () => {
  const sumByType = useExpenseStore<ExpenseSumByType[]>((state) => {
    const sumByType = {
      [ExpenseType.FOOD]: 0,
      [ExpenseType.LEISURE]: 0,
      [ExpenseType.TRAVEL]: 0,
      [ExpenseType.WORK]: 0,
    };

    state.expenses.forEach((expense) => {
      sumByType[expense.type] += expense.amount;
    });

    return Object.entries(sumByType).map(([type, amount]) => ({
      x: type as ExpenseType,
      y: amount,
    }));
  });

  return (
    <VictoryChart
      animate={{
        duration: 1000,
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
        tickLabelComponent={<TickLabelComponent data={sumByType} />}
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
        data={sumByType}
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