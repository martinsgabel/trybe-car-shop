import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motoService: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motoService = new MotorcycleService();
  }

  public async create() {
    const { body } = this.req;

    try {
      const createdMotorcycle = await this.motoService.create(body);
      return this.res.status(201).json(createdMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async listAllMotos() {
    try {
      const list = await this.motoService.listAllMotos();
      return this.res.status(200).json(list);
    } catch (error) {
      this.next(error);
    }
  }

  public async listById() {
    const { id } = this.req.params;

    try {
      const selectedMotorcycle = await this.motoService.listById(id);
      return this.res.status(200).json(selectedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}