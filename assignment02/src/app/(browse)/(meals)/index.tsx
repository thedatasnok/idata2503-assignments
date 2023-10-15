import CategoryCard from '@/components/CategoryCard';
import { getToken } from '@/config/gluestack';
import { useCategories } from '@/hooks';
import { Box } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { DimensionValue, FlatList, StyleProp, ViewStyle } from 'react-native';

const COLUMN_WRAPPER_STYLE: StyleProp<ViewStyle> = {
  justifyContent: 'space-between',
  paddingVertical: getToken('space', '1') as DimensionValue,
  paddingHorizontal: getToken('space', '2') as DimensionValue,
};

const FLATLIST_STYLE: StyleProp<ViewStyle> = {
  marginVertical: getToken('space', '1') as DimensionValue,
};

const CategoriesScreen = () => {
  const router = useRouter();
  const { categories } = useCategories();

  const gotoCategory = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };

  return (
    <>
      <FlatList
        data={categories}
        numColumns={2}
        columnWrapperStyle={COLUMN_WRAPPER_STYLE}
        style={FLATLIST_STYLE}
        renderItem={({ item: category }) => (
          <Box w='49%' key={category.id}>
            <CategoryCard
              name={category.name}
              onPress={() => gotoCategory(category.id)}
              colors={category.colors}
            />
          </Box>
        )}
      />
    </>
  );
};

export default CategoriesScreen;
