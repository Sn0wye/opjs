import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { products as mockedProducts } from '../../mocks/products';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { Cart } from '../Cart';
import { Categories } from '../Categories';
import { Header } from '../Header';
import { Empty } from '../Icons/Empty';
import { Menu } from '../Menu';
import { TableModal } from '../TableModal';
import { Text } from '../Text';
import {
  CategoriesContainer,
  Centered,
  Container,
  Footer,
  FooterContainer,
  MenuContainer
} from './styles';

export function Main() {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockedProducts);

  const toggleModal = () => {
    setIsTableModalOpen(state => !state);
  };

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleResetOrder = () => {
    setSelectedTable('');
    setCartItems([]);
  };

  const handleAddToCart = (product: Product) => {
    if (!selectedTable) {
      setIsTableModalOpen(true);
    }

    setCartItems(state => {
      const itemIndex = state.findIndex(
        item => item.product._id === product._id
      );

      if (itemIndex < 0) {
        return [
          ...state,
          {
            quantity: 1,
            product
          }
        ];
      }

      const newCartItems = [...state];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;
    });
  };

  const handleDecrementCartItem = (product: Product) => {
    setCartItems(state => {
      const itemIndex = state.findIndex(
        item => item.product._id === product._id
      );

      const newCartItems = [...state];
      const item = state[itemIndex];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  };

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <Centered>
            <ActivityIndicator size='large' color='#d73035' />
          </Centered>
        )}
        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>
            {products.length > 0 ? (
              <MenuContainer>
                <Menu products={products} onAddToCart={handleAddToCart} />
              </MenuContainer>
            ) : (
              <Centered>
                <Empty />
                <Text color='#666' style={{ marginTop: 24 }}>
                  Nenhum produto encrontrado.
                </Text>
              </Centered>
            )}
          </>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={toggleModal} disabled={isLoading}>
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              items={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onOrderConfirm={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        open={isTableModalOpen}
        onClose={toggleModal}
        onSave={handleSaveTable}
      />
    </>
  );
}

// TODO: dont let user close table modal when table was not defined yet (forced opening)
