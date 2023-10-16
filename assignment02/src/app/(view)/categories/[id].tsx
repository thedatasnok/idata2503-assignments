import RecipeCard from '@/components/RecipeCard';
import { getToken } from '@/config/gluestack';
import { useRecipes } from '@/hooks';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { DimensionValue, FlatList, StyleProp, ViewStyle } from 'react-native';

const FLATLIST_STYLE: StyleProp<ViewStyle> = {
  marginVertical: getToken('space', '2') as DimensionValue,
  paddingHorizontal: getToken('space', '2') as DimensionValue,
};

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

  if (!category) return null;

  return (
    <>
      <Stack.Screen
        options={{
          title: category.name,
        }}
      />

      <FlatList
        data={recipes}
        style={FLATLIST_STYLE}
        renderItem={({ item: recipe }) => (
          <RecipeCard
            name={recipe.name}
            imageUrl={recipe.imageUrls[0]}
            duration={recipe.duration}
            affordability={recipe.affordability}
            complexity={recipe.complexity}
            onPress={() => gotoRecipe(recipe.id)}
          />
        )}
      />
    </>
  );
};

export default CategoryScreen;
