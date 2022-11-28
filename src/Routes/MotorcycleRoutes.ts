import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRoutes = Router();

motoRoutes
  .post(
    '/cars',
    (req, res, next) => new MotorcycleController(req, res, next).create(),
  )
  .get(
    '/cars',
    (req, res, next) => new MotorcycleController(req, res, next).listAllMotos(),
  )
  .get(
    '/cars/:id',
    (req, res, next) => new MotorcycleController(req, res, next).listById(),
  );

export default motoRoutes;