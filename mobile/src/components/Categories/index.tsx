import { useState } from 'react';
import { FlatList } from 'react-native';

import { Category } from '../../types/Category';
import { Text } from '../Text';
import { CategoryItem, Icon } from './styles';

interface CategoriesProps {
  categories: Category[];
  onSelect: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelect }: CategoriesProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleSelectCategory = (id: string) => {
    const category = selectedCategoryId === id ? '' : id;
    setSelectedCategoryId(category);
    onSelect(category);
  };

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={item => item._id}
      contentContainerStyle={{
        paddingRight: 24
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: { _id, icon, name } }) => {
        const isSelected = selectedCategoryId === _id;
        const categoryOpacity = isSelected ? 1 : 0.5;
        return (
          <CategoryItem onPress={() => handleSelectCategory(_id)}>
            <Icon>
              <Text opacity={categoryOpacity}>{icon}</Text>
            </Icon>

            <Text size={14} weight={600} opacity={categoryOpacity}>
              {name}
            </Text>
          </CategoryItem>
        );
      }}
    />
  );

  // categories.map(({ _id, icon, name }) => (
  //   <Category key={_id}>
  //     <Icon>
  //       <Text>{icon}</Text>
  //     </Icon>
  //     <Text size={14} weight={600}>
  //       {name}
  //     </Text>
  //   </Category>
  // ));
}
