import { useRecipes } from '@/hooks';
import { Pressable, Text } from '@gluestack-ui/themed';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

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
