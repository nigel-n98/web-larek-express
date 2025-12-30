import { Router } from 'express';
import createOrder from '../controllers/order';
import createOrderValidator from '../validators/order';

const router = Router();

router.post('/', createOrderValidator, createOrder);

export default router;
