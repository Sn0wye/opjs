import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export class ListProductsByCategory {
  static async execute(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;

      const products = await Product.find()
        .where('category')
        .equals(categoryId);

      return res.json(products);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
