import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { AddToCartButton, Card, Details, Image, Separator } from './styles';

export default function Menu() {
  return (
    <FlatList
      data={products}
      style={{
        marginTop: 32
      }}
      contentContainerStyle={{
        paddingHorizontal: 24
      }}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item._id}
      renderItem={({ item: { name, description, price, imagePath } }) => (
        <Card>
          <Image
            source={{
              uri: `http://127.0.1.1/uploads/${imagePath}` // TODO: add server url
            }}
          />
          <Details>
            <Text weight={600}>{name}</Text>
            <Text
              size={14}
              color='#666'
              style={{
                marginVertical: 8
              }}
            >
              {description}
            </Text>
            <Text size={14} weight={600}>
              {formatCurrency(price)}
            </Text>
          </Details>
          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Card>
      )}
    />
  );
}
