import { Button, Text } from 'tamagui';
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
          <Button
            height='$20'
            width='$20'
            onPress={() => gotoCategory(category.id)}
          >
            <Text>{category.name}</Text>
          </Button>
        )}
      />
    </>
  );
};

export default CategoriesScreen;
