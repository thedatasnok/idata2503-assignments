import { Pressable, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';

const MOCK_CATEGORIES = [
  {
    id: 'italian',
    name: 'Italian',
  },
  {
    id: 'chinese',
    name: 'Chinese',
  },
  {
    id: 'indian',
    name: 'Indian',
  },
];

const CategoriesScreen = () => {
  const router = useRouter();

  const gotoCategory = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };

  return (
    <>
      <FlatList
        data={MOCK_CATEGORIES}
        numColumns={2}
        renderItem={({ item: category }) => (
          <Pressable
            bgColor='$red300'
            h='$32'
            w='$1/2'
            onPress={() => gotoCategory(category.id)}
          >
            <Text>{category.name}</Text>
          </Pressable>
        )}
      />
    </>
  );
};

export default CategoriesScreen;
