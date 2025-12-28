import { celebrate, Joi, Segments } from 'celebrate';

export const createOrderValidator = celebrate({
  [Segments.BODY]: Joi.object({
    items: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
    total: Joi.number().required(),
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  }),
});
