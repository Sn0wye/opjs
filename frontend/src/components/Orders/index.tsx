import { Order } from '../../types/Order';
import { OrderBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
  {
    _id: '6372e48cbcd195b0d3d0f7f3',
    table: '123',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: 'b1f5de53-bb82-4674-878a-c36f0e76f328-quatro-queijos.png',
          price: 40
        },
        quantity: 3,
        _id: '6372e48cbcd195b0d3d0f7f4'
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '68080cf0-131d-4d9f-beef-063a88886d75-coca-cola.png',
          price: 7
        },
        quantity: 2,
        _id: '6372e48cbcd195b0d3d0f7f5'
      }
    ]
  }
];

export const Orders = () => {
  return (
    <Container>
      <OrderBoard icon='🕑' title='Fila de espera' orders={orders} />
      <OrderBoard icon='👩‍🍳' title='Em produção' orders={[]} />
      <OrderBoard icon='✅' title='Pronto!' orders={[]} />
    </Container>
  );
};
