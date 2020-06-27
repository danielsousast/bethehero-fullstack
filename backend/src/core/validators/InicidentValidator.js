import { Segments, Joi } from 'celebrate';

export const listIncident = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.string().optional(),
  }),
};

export const createIncident = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
};

export const deleteIncident = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
