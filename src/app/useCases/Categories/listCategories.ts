import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export class ListCategories {
  static async execute(req: Request, res: Response) {
    try {
      const categories = await Category.find();

      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
