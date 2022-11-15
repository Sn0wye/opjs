import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export class CancelOrder {
  static async execute(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      await Order.findByIdAndDelete(orderId);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
