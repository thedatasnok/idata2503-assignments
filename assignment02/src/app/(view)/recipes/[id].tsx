import { getToken } from '@/config/gluestack';
import { useFavorited, useRecipe } from '@/hooks';
import {
  Box,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  styled,
} from '@gluestack-ui/themed';
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

  // workaround as styled does not respect the fill property if set
  const fill = isFavorited
    ? getToken('colors', 'error500')
    : (getToken('colors', 'primary500') as any);

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.name,
          headerRight: () => (
            <Pressable onPress={toggleFavorited}>
              {/* @ts-ignore */}
              <FavoriteIcon
                as={HeartIcon}
                fill={fill}
                states={{ active: isFavorited }}
              />
            </Pressable>
          ),
        }}
      />

      <ScrollView>
        <Image
          rounded='$md'
          h='$48'
          source={recipe.imageUrls[0]}
          alt={recipe.name}
        />

        <Box alignItems='center'>
          <Box py='$1' alignItems='center' w='$3/4'>
            <Text fontWeight='$bold' fontSize='$xl'>
              Ingredients
            </Text>

            <Text fontWeight='$normal' fontSize='$md' textAlign='center'>
              {recipe.ingredients.join('\n')}
            </Text>

            <Text fontWeight='$bold' fontSize='$xl' mt='$2'>
              Steps
            </Text>

            <Text fontWeight='$normal' fontSize='$md' textAlign='center'>
              {recipe.steps.join('\n\n')}
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default RecipeScreen;
