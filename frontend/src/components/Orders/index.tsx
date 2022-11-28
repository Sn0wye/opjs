import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { api } from '../../services/api';
import { Order } from '../../types/Order';
import { OrderBoard } from '../OrdersBoard';
import { Container } from './styles';

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_API_URL, {
      transports: ['websocket']
    });

    socket.on('orders@new', order => {
      setOrders(state => state.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const handleCancelOrder = (orderId: string) => {
    setOrders(state => state.filter(order => order._id !== orderId));
  };

  const handleOrderStatusChange = (
    orderId: string,
    status: Order['status']
  ) => {
    setOrders(state =>
      state.map(order => (order._id === orderId ? { ...order, status } : order))
    );
  };

  const waiting = orders.filter(order => order.status === 'WAITING');
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  return (
    <Container>
      <OrderBoard
        icon='🕑'
        title='Fila de espera'
        orders={waiting}
        onCancel={handleCancelOrder}
        onStatusChange={handleOrderStatusChange}
      />
      <OrderBoard
        icon='👩‍🍳'
        title='Em produção'
        orders={inProduction}
        onCancel={handleCancelOrder}
        onStatusChange={handleOrderStatusChange}
      />
      <OrderBoard
        icon='✅'
        title='Pronto!'
        orders={done}
        onCancel={handleCancelOrder}
        onStatusChange={handleOrderStatusChange}
      />
    </Container>
  );
};
