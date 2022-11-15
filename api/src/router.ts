import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

import { CreateCategory } from './app/useCases/Categories/createCategory';
import { ListCategories } from './app/useCases/Categories/listCategories';
import { ListProductsByCategory } from './app/useCases/Categories/listProductsByCategory';
import { CancelOrder } from './app/useCases/Orders/cancelOrder';
import { ChangeOrderStatus } from './app/useCases/Orders/changeOrderStatus';
import { CreateOrder } from './app/useCases/Orders/createOrder';
import { ListOrders } from './app/useCases/Orders/listOrders';
import { CreateProduct } from './app/useCases/Products/createProduct';
import { ListProducts } from './app/useCases/Products/listProducts';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      callback(null, `${randomUUID()}-${file.originalname}`);
    }
  })
});

// List Categories
router.get('/categories', ListCategories.execute);

// Create Category
router.post('/categories', CreateCategory.execute);

// List Products
router.get('/products', ListProducts.execute);

// Create Product
router.post('/products', upload.single('image'), CreateProduct.execute);

// List Products by Category
router.get('/categories/:categoryId/products', ListProductsByCategory.execute);

// List orders
router.get('/orders', ListOrders.execute);

// Create Order
router.post('/orders', CreateOrder.execute);

// Change order status
router.patch('/orders/:orderId', ChangeOrderStatus.execute);

// Delete/cancel order
router.delete('/orders/:orderId', CancelOrder.execute);
