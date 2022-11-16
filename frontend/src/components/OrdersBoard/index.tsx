import { useState } from 'react';

import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrderContainer } from './styles';

interface Props {
  icon: string;
  title: string;
  orders: Order[];
}

export const OrderBoard = ({ title, icon, orders }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  };

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    toggleModal();
  };

  return (
    <Board>
      <OrderModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        order={selectedOrder}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrderContainer>
          {orders.map(order => (
            <button
              type='button'
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>{order.table}</strong>
              <span>
                {order.products.length}{' '}
                {order.products.length === 1 ? 'Item' : 'Itens'}
              </span>
            </button>
          ))}
        </OrderContainer>
      )}
    </Board>
  );
};
