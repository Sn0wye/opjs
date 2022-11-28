import { useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../../services/api';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrderContainer } from './styles';

interface Props {
  icon: string;
  title: string;
  orders: Order[];
  onCancel: (orderId: string) => void;
  onStatusChange: (orderId: string, status: Order['status']) => void;
}

export const OrderBoard = ({
  title,
  icon,
  orders,
  onCancel,
  onStatusChange
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  };

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    toggleModal();
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder._id}`);
    toast.success(`O pedido da Mesa ${selectedOrder.table} foi cancelado`);

    onCancel(selectedOrder._id);
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleStatusChange = () => {
    if (!selectedOrder) return;

    const status =
      selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    setIsLoading(true);
    api.patch(`/orders/${selectedOrder._id}`, { status });

    toast.success(
      `O pedido da mesa ${selectedOrder.table} teve o status alterado!`
    );

    onStatusChange(selectedOrder._id, status);
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <Board>
      <OrderModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        order={selectedOrder}
        onCancel={handleCancelOrder}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
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
