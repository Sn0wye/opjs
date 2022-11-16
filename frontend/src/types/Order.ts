import { Product } from './Product';

export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    _id: string;
    quantity: number;
    product: Product;
  }[];
}
