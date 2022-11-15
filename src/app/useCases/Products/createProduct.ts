import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export class CreateProduct {
  static async execute(req: Request, res: Response) {
    try {
      const imagePath = req.file?.filename;

      const { name, description, price, category, ingredients } = req.body;

      const product = await Product.create({
        name,
        description,
        category,
        imagePath,
        ingredients: ingredients ? JSON.parse(ingredients) : [],
        price: Number(price)
      });

      return res.status(201).json(product);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
