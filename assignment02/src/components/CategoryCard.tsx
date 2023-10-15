import { Pressable, styled, Text } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';

const MyLinearGradient = styled(
  LinearGradient,
  {},
  {
    resolveProps: ['colors', 'start', 'end'],
  },
  {
    propertyTokenMap: {
      colors: 'colors',
    },
    propertyResolver: {
      colors: (rawValue: any, resolver: any) => {
        rawValue.forEach((color: any, index: number) => {
          rawValue[index] = resolver(color);
        });
        return rawValue;
      },
    },
  }
);

export interface CategoryCardProps {
  name: string;
  onPress?: () => void;
  colors: [string, string]
}

type Point = LinearGradient['props']['start'];

const GRADIENT_START: any = { x: 0.0, y: 0.0 } satisfies Point;
const GRADIENT_END: any = { x: 1.0, y: 0.0 } satisfies Point;

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onPress, colors }) => {
  const emitPress = () => onPress?.();

  return (
    <Pressable onPress={emitPress}>
      <MyLinearGradient
        h='$20'
        start={GRADIENT_START}
        end={GRADIENT_END}
        display='flex'
        alignItems='center'
        justifyContent='center'
        rounded={'$md'}
        colors={colors}
        borderWidth='$1'
        borderColor='$gray300'
      >
        <Text fontWeight='$medium'>{name}</Text>
      </MyLinearGradient>
    </Pressable>
  );
};

export default CategoryCard;
