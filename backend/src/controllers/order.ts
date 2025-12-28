import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import validator from 'validator';

import Product from '../models/product';
import { CreateOrderBody } from '../types/order';
import BadRequestError from '../errors/bad-request-error';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      items,
      total,
      payment,
      email,
      phone,
      address,
    } = req.body as CreateOrderBody;

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Items must be a non-empty array'));
    }

    if (!['card', 'online'].includes(payment)) {
      return next(new BadRequestError('Invalid payment type'));
    }

    if (!email || !phone || !address) {
      return next(new BadRequestError('Missing customer data'));
    }

    if (!validator.isEmail(email)) {
      return next(new BadRequestError('Invalid email'));
    }

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Some products not found'));
    }

    const calculatedTotal = products.reduce((sum, product) => {
      if (product.price === null) {
        throw new BadRequestError('Product without price');
      }
      return sum + product.price;
    }, 0);

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Total mismatch'));
    }

    return res.json({
      id: crypto.randomUUID(),
      total: calculatedTotal,
    });
  } catch (error) {
    return next(error);
  }
};
