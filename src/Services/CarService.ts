import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';

export default class CarService {
  private model: CarODM;

  constructor() {
    this.model = new CarODM();
  }

  private domain(car: ICar | null): Car | null {
    if (car) { return new Car(car); }
    return null;
  }

  public async create(car: ICar): Promise<Car | null> {
    const createdCar = await this.model.create(car);
    return this.domain(createdCar);
  }

  public async listAllCars(): Promise<(Car | null)[]> {
    const list = await this.model.findAll();

    if (!list) return [];

    return list.map((car) => this.domain(car));
  }

  public async listById(id: string): Promise<Car | null> {
    if (!isValidObjectId(id)) throw Error('Invalid mongo id');

    const selectedCar = await this.model.findById(id);

    if (!selectedCar) throw Error('Car not found');

    return this.domain(selectedCar);
  }

  public async updateCar(id: string, obj: Partial<ICar>): Promise<Car | null> {
    if (!isValidObjectId(id)) throw Error('Invalid mongo id');

    const updatedCar = await this.model.update(id, obj);

    if (!updatedCar) throw Error('Car not found');

    return this.domain(updatedCar);
  }
}