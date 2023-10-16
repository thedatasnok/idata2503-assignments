import RecipeCard from '@/components/RecipeCard';
import { getToken } from '@/config/gluestack';
import { useFavorites } from '@/hooks';
import { Box, Icon, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { HeartOffIcon } from 'lucide-react-native';
import { DimensionValue, FlatList, StyleProp, ViewStyle } from 'react-native';

const FLATLIST_STYLE: StyleProp<ViewStyle> = {
  marginVertical: getToken('space', '2') as DimensionValue,
  paddingHorizontal: getToken('space', '2') as DimensionValue,
};

const FavoritesScreen = () => {
  const router = useRouter();
  const { recipes } = useFavorites();

  const gotoRecipe = (recipeId: string) => {
    router.push(`/recipes/${recipeId}`);
  };

  return (
    <>
      <FlatList
        data={recipes}
        style={FLATLIST_STYLE}
        ListEmptyComponent={() => (
          <Box h='$96' justifyContent='center' alignItems='center' px='$4'>
            {/* @ts-ignore */}
            <Icon as={HeartOffIcon} color='$gray500' size='48' />
            <Text color='$gray500' fontSize='$md' fontWeight='$medium' textAlign='center'>
              Seems like you haven't marked any recipes as favorite.
            </Text>
          </Box>
        )}
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

export default FavoritesScreen;
