import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps } from 'react';

import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  Actions,
  Button,
  Close,
  Content,
  Item,
  ItemDetails,
  OrderDetails,
  OrderItems,
  Overlay,
  Status,
  Title,
  Total
} from './styles';

const StatusIcon = {
  DONE: '✅',
  IN_PRODUCTION: '👩‍🍳',
  WAITING: '🕑'
};

const StatusText = {
  DONE: 'Pronto!',
  IN_PRODUCTION: 'Em preparação',
  WAITING: 'Fila de espera'
};

type Props = ComponentProps<typeof Dialog.Root> & {
  isOpen: boolean;
  toggleModal: () => void;
  order: Order | null;
};

const Root = Dialog.Root;
const Portal = Dialog.Portal;

export const OrderModal = ({ isOpen, toggleModal, order }: Props) => {
  if (!order) {
    return null;
  }

  const orderTotal = order.products.reduce((acc, { quantity, product }) => {
    acc += quantity * product.price;
    return acc;
  }, 0);

  return (
    <Root open={isOpen} onOpenChange={toggleModal}>
      <Portal>
        <Overlay />
        <Content>
          <Title>Mesa {order.table}</Title>
          <Status>
            <small>Status do Pedido</small>
            <div>
              <span>{StatusIcon[order.status]}</span>
              <strong>{StatusText[order.status]}</strong>
            </div>
          </Status>

          <OrderDetails>
            <strong>Itens</strong>

            <OrderItems>
              {order.products.map(({ _id, product, quantity }) => (
                <Item key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.name}
                    width={56}
                    height={28.51}
                  />

                  <span>{quantity}x</span>
                  <ItemDetails>
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </ItemDetails>
                </Item>
              ))}
            </OrderItems>

            <Total>
              <span>Total</span>
              <strong>{formatCurrency(orderTotal)}</strong>
            </Total>
          </OrderDetails>

          <Actions>
            <Button type='button'>
              <span>👩‍🍳</span>
              <strong>Iniciar Produção</strong>
            </Button>

            <Button type='button' variant='secondary'>
              Cancelar Pedido
            </Button>
          </Actions>

          <Close>
            <img
              src='/img/close-icon.svg'
              alt='Close Icon'
              aria-label='Close modal'
            />
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};
