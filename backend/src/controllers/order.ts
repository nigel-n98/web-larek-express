import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

import Product from '../models/product';
import { CreateOrderBody } from '../types/order';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { items, total } = req.body as CreateOrderBody;

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Some products not found'));
    }

    const productWithoutPrice = products.find(
      (product) => product.price === null,
    );

    if (productWithoutPrice) {
      return next(new BadRequestError('Product without price'));
    }

    const calculatedTotal = products.reduce(
      (sum, product) => sum + (product.price as number),
      0,
    );

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Total mismatch'));
    }

    return res.json({
      id: crypto.randomUUID(),
      total: calculatedTotal,
    });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
