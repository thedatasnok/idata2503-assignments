import { useRecipe } from '@/hooks';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const RecipeScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  if (typeof id !== 'string') {
    router.push('/');
    return null;
  }

  const recipe = useRecipe(id);

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.name,
        }}
      />
    </>
  );
};

export default RecipeScreen;
