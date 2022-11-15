import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export class CreateOrder {
  static async execute(req: Request, res: Response) {
    try {
      const { table, products } = req.body;

      const order = await Order.create({
        table,
        products
      });

      return res.status(201).json(order);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
