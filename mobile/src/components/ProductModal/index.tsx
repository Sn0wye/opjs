import { FlatList, Modal } from 'react-native';

import type { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import {
  CloseButton,
  Content,
  Footer,
  FooterContainer,
  Header,
  Image,
  Ingredient,
  Ingredients,
  Price
} from './styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({
  open,
  onClose,
  product,
  onAddToCart
}: ModalProps) {
  if (!product) {
    return null;
  }

  const { name, description, imagePath, ingredients, price } = product;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Modal
      visible={open}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://127.0.1.1/uploads/${imagePath}` // TODO: add server url
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <Content>
        <Header>
          <Text size={24} weight={600}>
            {name}
          </Text>
          <Text color='#666' style={{ marginTop: 8 }}>
            {description}
          </Text>
        </Header>

        {ingredients.length > 0 && (
          <Ingredients>
            <Text weight={600} color='#666'>
              Ingredients
            </Text>
            <FlatList
              data={ingredients}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item._id}
              style={{ marginTop: 16 }}
              renderItem={({ item: { icon, name } }) => (
                <Ingredient>
                  <Text>{icon}</Text>
                  <Text size={14} color='#666' style={{ marginLeft: 20 }}>
                    {name}
                  </Text>
                </Ingredient>
              )}
            />
          </Ingredients>
        )}
      </Content>
      <Footer>
        <FooterContainer>
          <Price>
            <Text color='#666'>Preço</Text>
            <Text size={20} weight={600}>
              {formatCurrency(price)}
            </Text>
          </Price>

          <Button onPress={handleAddToCart}>Adicionar ao Pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
