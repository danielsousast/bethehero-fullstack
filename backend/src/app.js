import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.handler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  handler() {
    this.server.use(errors());
  }
}

export default new App().server;
