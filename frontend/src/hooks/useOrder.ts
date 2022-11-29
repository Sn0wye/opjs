import { toast } from 'react-toastify';
import create from 'zustand';

import { api } from '../services/api';
import { Order } from '../types/Order';

interface OrderContext {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  cancelOrder: (order: Order) => Promise<void>;
  changeOrderStatus: (order: Order, status: Order['status']) => Promise<void>;
  addOrder: (order: Order) => void;
}

export const useOrder = create<OrderContext>((set, get) => ({
  orders: [],
  setOrders: orders => set({ orders }),
  changeOrderStatus: async (order, status) => {
    const orderId = order._id;
    api.patch(`/orders/${orderId}`, { status });

    toast.success(`O pedido da mesa ${order.table} teve o status alterado!`);

    set(state => ({
      ...state,
      orders: state.orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      )
    }));
  },
  cancelOrder: async order => {
    const orderId = order._id;
    await api.delete(`/orders/${orderId}`);
    toast.success(`O pedido da Mesa ${order.table} foi cancelado`);

    set(state => ({
      orders: state.orders.filter(order => order._id !== orderId)
    }));
  },
  addOrder: order => set(state => ({ orders: [...state.orders, order] }))
}));
