import { Router } from 'express';
import { celebrate } from 'celebrate';
import OngController from './core/controllers/OngController';
import IncidentController from './core/controllers/IncidentController';
import ProfileController from './core/controllers/ProfileController';
import SessionController from './core/controllers/SessionController';

import { createOng } from './core/validators/OngValidator';
import { profileList } from './core/validators/ProfileValidator';
import {
  createIncident,
  deleteIncident,
  listIncident,
} from './core/validators/InicidentValidator';
import Auth from './core/middlewares/Auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/ongs', celebrate(createOng), OngController.store);
routes.get('/ongs', OngController.index);

routes.get('/incidents', celebrate(listIncident), IncidentController.index);
routes.get('/incidents/:id', IncidentController.show);

routes.use(Auth);
routes.post('/incidents', celebrate(createIncident), IncidentController.store);
routes.put('/incidents/:id', IncidentController.update);
routes.delete('/incidents/:id', celebrate(deleteIncident), IncidentController.destroy);
routes.get('/profile', celebrate(profileList), ProfileController.index);

export default routes;
