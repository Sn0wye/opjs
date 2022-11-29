import { useEffect } from 'react';
import socketIo from 'socket.io-client';

import { useOrder } from '../../hooks/useOrder';
import { api } from '../../services/api';
import { OrderBoard } from '../OrdersBoard';
import { Container } from './styles';

export const Orders = () => {
  const { orders, setOrders, addOrder } = useOrder();

  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_API_URL, {
      transports: ['websocket']
    });

    socket.on('orders@new', order => {
      addOrder(order);
    });
  }, [addOrder]);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data));
  }, [setOrders]);

  const waiting = orders.filter(order => order.status === 'WAITING');
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  return (
    <Container>
      <OrderBoard icon='🕑' title='Fila de espera' orders={waiting} />
      <OrderBoard icon='👩‍🍳' title='Em produção' orders={inProduction} />
      <OrderBoard icon='✅' title='Pronto!' orders={done} />
    </Container>
  );
};
