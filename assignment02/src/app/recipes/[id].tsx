import { Text } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';

const RecipeScreen = () => {
  const { id } = useLocalSearchParams();

  return <Text>Recipe {id}</Text>;
};

export default RecipeScreen;
