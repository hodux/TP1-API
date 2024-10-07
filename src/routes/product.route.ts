import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.get('/products', ProductController.getProducts);
router.post('/products', ProductController.addProduct);
router.put('/products/:id', ProductController.modifyProductById);
router.delete('/products/:id', ProductController.deleteProductById);

export default router;
