import { Text } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';

const CategoryScreen = () => {
  const { id } = useLocalSearchParams();

  return <Text>Category {id}</Text>;
};

export default CategoryScreen;
