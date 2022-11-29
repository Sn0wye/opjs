import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps, useState } from 'react';

import { useOrder } from '../../hooks/useOrder';
import { baseURL } from '../../services/api';
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
  const [isLoading, setIsLoading] = useState(false);
  const { changeOrderStatus, cancelOrder } = useOrder();

  if (!order) {
    return null;
  }

  const orderTotal = order.products.reduce((acc, { quantity, product }) => {
    acc += quantity * product.price;
    return acc;
  }, 0);

  const handleStatusChange = async () => {
    const status = order.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    setIsLoading(true);

    await changeOrderStatus(order, status);
    setIsLoading(false);
    toggleModal();
  };

  const handleCancelOrder = async () => {
    setIsLoading(true);

    await cancelOrder(order);
    setIsLoading(false);
    toggleModal();
  };

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
                    src={`${baseURL}/uploads/${product.imagePath}`}
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
            {order.status !== 'DONE' && (
              <Button
                type='button'
                disabled={isLoading}
                onClick={handleStatusChange}
              >
                <span>{order.status === 'WAITING' ? '👩‍🍳' : '✅'}</span>
                <strong>
                  {order.status === 'WAITING'
                    ? 'Iniciar Produção'
                    : 'Concluir Pedido'}
                </strong>
              </Button>
            )}

            <Button
              type='button'
              variant='secondary'
              onClick={handleCancelOrder}
              disabled={isLoading}
            >
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
