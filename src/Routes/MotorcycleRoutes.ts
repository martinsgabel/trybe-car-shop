import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRoutes = Router();

motoRoutes
  .post(
    '/motorcycle',
    (req, res, next) => new MotorcycleController(req, res, next).create(),
  )
  .get(
    '/motorcycles',
    (req, res, next) => new MotorcycleController(req, res, next).listAllMotos(),
  )
  .get(
    '/motorcycles/:id',
    (req, res, next) => new MotorcycleController(req, res, next).listById(),
  );

export default motoRoutes;