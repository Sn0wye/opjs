import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export class CreateCategory {
  static async execute(req: Request, res: Response) {
    try {
      const { icon, name } = req.body;

      if (!name) {
        return res.status(400).json({
          error: 'Name is required'
        });
      }

      if (!icon) {
        return res.status(400).json({
          error: 'Icon is required'
        });
      }

      const category = await Category.create({
        icon,
        name
      });

      return res.status(201).json(category);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
