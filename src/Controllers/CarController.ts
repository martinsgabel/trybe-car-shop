import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carService: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carService = new CarService();
  }

  public async create() {
    const car: ICar = { ...this.req.body };

    try {
      const createdCar = await this.carService.create(car);
      return this.res.status(201).json(createdCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async listAllCars() {
    try {
      const list = await this.carService.listAllCars();
      return this.res.status(200).json(list);
    } catch (error) {
      this.next(error);
    }
  }

  public async listById() {
    const { id } = this.req.params;

    try {
      const selectedCar = await this.carService.listById(id);
      return this.res.status(200).json(selectedCar);
    } catch (error) {
      this.next(error);
    }
  }
}