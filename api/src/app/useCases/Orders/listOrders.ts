import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export class ListOrders {
  static async execute(req: Request, res: Response) {
    try {
      const orders = await Order.find()
        .sort({
          createdAt: 'ascending'
        })
        .populate('products.product');

      return res.json(orders);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
