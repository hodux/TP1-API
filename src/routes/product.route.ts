import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.get('/products', ProductController.getProducts);
router.post('/products', ProductController.addProduct);

export default router;
