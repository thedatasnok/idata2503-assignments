import { useRecipes } from '@/hooks';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'tamagui';
import { Pressable } from 'react-native';

const CategoryScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  if (typeof id !== 'string') {
    router.push('/');
    return null;
  }

  const { category, recipes } = useRecipes(id);
  const gotoRecipe = (recipeId: string) => {
    router.push(`/recipes/${recipeId}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: category.name,
        }}
      />

      <Text>Category {id}</Text>

      {recipes.map((recipe) => (
        <Pressable key={recipe.id} onPress={() => gotoRecipe(recipe.id)}>
          <Text>{recipe.name}</Text>
        </Pressable>
      ))}
    </>
  );
};

export default CategoryScreen;
