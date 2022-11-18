import { useState } from 'react';
import { FlatList } from 'react-native';

import { categories } from '../../mocks/categories';
import { Text } from '../Text';
import { Category, Icon } from './styles';

export function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleSelectCategory = (id: string) => {
    const category = selectedCategoryId === id ? '' : id;
    setSelectedCategoryId(category);
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
          <Category onPress={() => handleSelectCategory(_id)}>
            <Icon>
              <Text opacity={categoryOpacity}>{icon}</Text>
            </Icon>

            <Text size={14} weight={600} opacity={categoryOpacity}>
              {name}
            </Text>
          </Category>
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
