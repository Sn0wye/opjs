import { useState } from 'react';

import { Button } from '../Button';
import { Categories } from '../Categories';
import { Header } from '../Header';
import Menu from '../Menu';
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

  const toggleModal = () => {
    setIsTableModalOpen(state => !state);
  };

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  return (
    <>
      <Container>
        <Header />
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && <Button onPress={toggleModal}>Novo Pedido</Button>}
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
