import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product';
import { createProductValidator } from '../validators/product';

const router = Router();

router.get('/', getProducts);
router.post('/', createProductValidator, createProduct);

export default router;
