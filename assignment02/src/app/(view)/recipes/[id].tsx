import { getToken } from '@/config/gluestack';
import { useFavorited, useIncompatible, useRecipe } from '@/hooks';
import {
  Box,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  styled,
  useToast,
} from '@gluestack-ui/themed';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { HeartIcon } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

const FavoriteIcon = styled(Icon, {
  color: '$primary50',
  fill: '$primary50',
  ':active': {
    fill: '$error500',
    color: '$error500',
  },
});

const TOAST_DURATION = 5_000;

const RecipeScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const recipe = useRecipe(id as string);
  const { isFavorited, toggleFavorited } = useFavorited(id as string);
  const { incompatible, reason } = useIncompatible(recipe);
  const toast = useToast();

  if (typeof id !== 'string') {
    router.push('/');
    return null;
  }

  if (!recipe) {
    router.push('/');
    return null;
  }

  const handleFavorite = () => {
    const content = isFavorited
      ? 'Removed from favorites'
      : 'Added to favorites';

    toast.closeAll();

    toast.show({
      duration: TOAST_DURATION,
      placement: 'bottom',
      render: () => (
        <Box
          bg='$gray200'
          borderWidth='$1'
          borderColor='$gray300'
          w='$96'
          rounded='$md'
          my='$2'
          p='$2'
        >
          <Text fontWeight='$semibold' color='$gray950'>
            {content}
          </Text>
        </Box>
      ),
    });

    toggleFavorited();
  };

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
            <Pressable onPress={handleFavorite}>
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
        <ImageCarousel images={recipe.imageUrls} recipe={recipe.name} />

        {incompatible && (
          <Box
            p='$2'
            mt='$2'
            alignItems='center'
            alignSelf='center'
            bg='$error100'
            borderWidth='$1'
            borderColor='$error300'
            rounded='$md'
          >
            <Text
              textTransform='uppercase'
              color='$error950'
              fontWeight='$semibold'
            >
              This meal is not aligned with your preferences
            </Text>

            {reason.map((r) => (
              <Text key={r} color='$error950'>
                {r}
              </Text>
            ))}
          </Box>
        )}

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

interface ImageCarouselProps {
  images: string[];
  recipe: string;
}

const CarouselDot = styled(Pressable, {
  width: '$2',
  height: '$2',
  borderRadius: '$full',
  bg: '$primary200',
  ':active': {
    bg: '$primary500',
  },
});

/**
 * A swipeable image carousel.
 * Conditionally renders pressable dots if there are more than one image.
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, recipe }) => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(Math.max(index - 1, 0));
  const [nextIndex, setNextIndex] = useState(
    Math.min(index + 1, images.length - 1)
  );
  const swipeableRef = useRef<Swipeable>(null);

  const handleOpen = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setIndex(prevIndex);
      setPrevIndex(Math.max(prevIndex - 1, 0));
      setNextIndex(Math.min(prevIndex + 1, images.length - 1));
    } else {
      setIndex(nextIndex);
      setPrevIndex(Math.max(nextIndex - 1, 0));
      setNextIndex(Math.min(nextIndex + 1, images.length - 1));
    }
  };

  const onDotPress = (pressedIndex: number) => {
    if (pressedIndex < index) {
      setPrevIndex(pressedIndex);
      swipeableRef.current?.openLeft();
    } else if (pressedIndex > index) {
      setNextIndex(pressedIndex);
      swipeableRef.current?.openRight();
    }
  };

  return (
    <>
      <Swipeable
        key={index}
        ref={swipeableRef}
        friction={2}
        leftThreshold={36}
        rightThreshold={36}
        renderLeftActions={() => {
          if (prevIndex === index) return undefined;

          return (
            <Image w='$full' h='$48' source={images[prevIndex]} alt={recipe} />
          );
        }}
        renderRightActions={() => {
          if (nextIndex === index) return undefined;

          return (
            <Image w='$full' h='$48' source={images[nextIndex]} alt={recipe} />
          );
        }}
        onSwipeableOpen={handleOpen}
      >
        <Image w='$full' h='$48' source={images[index]} alt={recipe} />
      </Swipeable>

      {images.length > 1 && (
        <Box
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap='$2'
          mt='$2'
        >
          {images.map((_image, i) => (
            <CarouselDot
              key={i}
              states={{ active: i === index }}
              onPress={() => onDotPress(i)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default RecipeScreen;
