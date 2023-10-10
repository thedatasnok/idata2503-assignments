import { Pressable, styled, Text } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';

const MyLinearGradient = styled(
  LinearGradient,
  {},
  {
    resolveProps: ['colors'],
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
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onPress }) => {
  const emitPress = () => onPress?.();

  return (
    <Pressable onPress={emitPress}>
      <MyLinearGradient
        h='$20'
        aspectRatio={1}
        display='flex'
        alignItems='center'
        justifyContent='center'
        colors={['$primary900', '$primary100']}
      >
        <Text>{name}</Text>
      </MyLinearGradient>
    </Pressable>
  );
};

export default CategoryCard;
