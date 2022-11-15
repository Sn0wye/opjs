import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export class ListProducts {
  static async execute(req: Request, res: Response) {
    try {
      const products = await Product.find();

      return res.json(products);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
