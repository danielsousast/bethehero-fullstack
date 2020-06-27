import { Segments, Joi } from 'celebrate';

export const profileList = {
  [Segments.HEADERS]: Joi
    .object({ authorization: Joi.string().required() }).unknown(),
};
