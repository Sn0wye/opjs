import create from 'zustand';

import { Order } from '../types/Order';

interface OrderContext {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  cancelOrder: (orderId: string) => void;
  changeOrderStatus: (orderId: string, status: Order['status']) => void;
  addOrder: (order: Order) => void;
}

export const useOrder = create<OrderContext>((set, get) => ({
  orders: [],
  setOrders: orders => set(state => ({ orders })),
  changeOrderStatus: (orderId, status) =>
    set(state => ({
      ...state,
      orders: state.orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      )
    })),
  cancelOrder: orderId =>
    set(state => ({
      orders: state.orders.filter(order => order._id !== orderId)
    })),
  addOrder: order => set(state => ({ orders: [...state.orders, order] }))
}));
