import { Segments, Joi } from 'celebrate';

// eslint-disable-next-line import/prefer-default-export
export const createOng = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    whatsapp: Joi.string().required(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
};
