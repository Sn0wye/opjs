import { useState } from 'react';
import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { AddToCartButton, Card, Details, Image, Separator } from './styles';

interface Props {
  onAddToCart: (product: Product) => void;
}

export function Menu({ onAddToCart }: Props) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const toggleProductModal = () => {
    setIsProductModalOpen(state => !state);
  };

  const handleOpenProductModal = (product: Product) => {
    setSelectedProduct(product);
    toggleProductModal();
  };

  return (
    <>
      <ProductModal
        open={isProductModalOpen}
        onClose={toggleProductModal}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

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
        renderItem={({ item }) => {
          const { name, imagePath, description, price } = item;

          return (
            <Card onPress={() => handleOpenProductModal(item)}>
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
              <AddToCartButton onPress={() => onAddToCart(item)}>
                <PlusCircle />
              </AddToCartButton>
            </Card>
          );
        }}
      />
    </>
  );
}
