import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export class ChangeOrderStatus {
  static async execute(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
        return res.status(400).json({
          error: "Status should be 'WAITING', 'IN_PRODUCTION' or 'DONE'"
        });
      }

      await Order.findByIdAndUpdate(orderId, { status });

      res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
