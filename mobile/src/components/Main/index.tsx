import { useState } from 'react';

import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { Cart } from '../Cart';
import { Categories } from '../Categories';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { TableModal } from '../TableModal';
import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer
} from './styles';

export function Main() {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const toggleModal = () => {
    setIsTableModalOpen(state => !state);
  };

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleCancelOrder = () => {
    setSelectedTable('');
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
          onCancelOrder={handleCancelOrder}
        />
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && <Button onPress={toggleModal}>Novo Pedido</Button>}
          {selectedTable && (
            <Cart
              items={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
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
