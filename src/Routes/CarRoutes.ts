import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes
  .post(
    '/cars',
    (req, res, next) => new CarController(req, res, next).create(),
  )
  .get(
    '/cars',
    (req, res, next) => new CarController(req, res, next).listAllCars(),
  )
  .get(
    '/cars/:id',
    (req, res, next) => new CarController(req, res, next).listById(),
  );

export default carRoutes;