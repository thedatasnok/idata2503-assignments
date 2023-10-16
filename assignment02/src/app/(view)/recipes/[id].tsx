import { useFavorited, useRecipe } from '@/hooks';
import { Icon, Pressable, styled } from '@gluestack-ui/themed';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { HeartIcon } from 'lucide-react-native';

const FavoriteIcon = styled(Icon, {
  color: '$primary50',
  fill: '$primary50',
  ':active': {
    fill: '$error500',
    color: '$error500',
  },
});

const RecipeScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  if (typeof id !== 'string') {
    router.push('/');
    return null;
  }

  const recipe = useRecipe(id);
  const { isFavorited, toggleFavorited } = useFavorited(id);

  if (!recipe) {
    router.push('/');
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.name,
          headerRight: () => (
            <Pressable onPress={toggleFavorited}>
              {/* @ts-ignore */}
              <FavoriteIcon as={HeartIcon} states={{ active: isFavorited }} />
            </Pressable>
          ),
        }}
      />
    </>
  );
};

export default RecipeScreen;
