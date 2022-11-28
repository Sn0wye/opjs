import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { api, baseURL } from '../../services/api';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { ConfirmedOrderModal } from '../ConfirmedOrderModal';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
  ActionButton,
  Actions,
  Description,
  Details,
  Image,
  Item,
  Quantity,
  Summary,
  Total
} from './styles';

interface Props {
  items: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onOrderConfirm: () => void;
  selectedTable: string;
}

export function Cart({
  items,
  onAdd,
  onDecrement,
  onOrderConfirm,
  selectedTable
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isCartEmpty = items.length === 0;
  const total = items.reduce((acc, item) => {
    acc += item.product.price * item.quantity;
    return acc;
  }, 0);

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  };

  const handleConfirmOrder = async () => {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }))
    };
    await api.post('/orders', payload);
    setIsLoading(false);
    toggleModal();
  };

  const handleOk = () => {
    toggleModal();
    onOrderConfirm();
  };

  return (
    <>
      <ConfirmedOrderModal open={isModalOpen} onOk={handleOk} />

      {!isCartEmpty && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={items}
          style={{
            marginBottom: 16,
            maxHeight: 150
          }}
          keyExtractor={({ product }) => product._id}
          renderItem={({ item }) => {
            const { product, quantity } = item;
            const { name, price, imagePath } = product;
            return (
              <Item>
                <Description>
                  <Image
                    source={{
                      uri: `${baseURL}/uploads/${imagePath}`
                    }}
                  />
                  <Quantity>
                    <Text size={14} color='#666'>
                      {quantity}x
                    </Text>
                  </Quantity>
                  <Details>
                    <Text size={14} weight={600}>
                      {name}
                    </Text>
                    <Text color='#666'>{formatCurrency(price)}</Text>
                  </Details>
                </Description>
                <Actions>
                  <ActionButton onPress={() => onAdd(product)}>
                    <PlusCircle />
                  </ActionButton>
                  <ActionButton onPress={() => onDecrement(product)}>
                    <MinusCircle />
                  </ActionButton>
                </Actions>
              </Item>
            );
          }}
        />
      )}
      <Summary>
        <Total>
          {isCartEmpty ? (
            <Text color='#999'>Seu carrinho está vazio</Text>
          ) : (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight={600}>
                {formatCurrency(total)}
              </Text>
            </>
          )}
        </Total>

        <Button
          disabled={isCartEmpty}
          onPress={handleConfirmOrder}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
