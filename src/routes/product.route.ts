import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware'
import { roleMiddleware } from '../middlewares/roles.middleware';

const router = Router();

router.get('/products', ProductController.getProducts);
router.post('/products', verifyToken, roleMiddleware(["gestionnaire"]), ProductController.addProduct);
router.put('/products/:id', verifyToken, roleMiddleware(["gestionnaire"]), ProductController.modifyProductById);
router.delete('/products/:id', verifyToken, roleMiddleware(["gestionnaire"]), ProductController.deleteProductById);

export default router;
