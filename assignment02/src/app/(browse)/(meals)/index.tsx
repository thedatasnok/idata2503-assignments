import CategoryCard from '@/components/CategoryCard';
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
          <CategoryCard
            key={category.id}
            name={category.name}
            onPress={() => gotoCategory(category.id)}
          />
        )}
      />
    </>
  );
};

export default CategoriesScreen;
