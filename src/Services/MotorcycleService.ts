import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private model: MotorcycleODM;

  constructor() {
    this.model = new MotorcycleODM();
  }

  private domain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) return new Motorcycle(moto);
    return null;
  }

  public async create(moto: IMotorcycle): Promise<Motorcycle | null> {
    const createdMotorcycle = await this.model.create(moto);
    return this.domain(createdMotorcycle);
  }

  public async listAllMotos(): Promise<(Motorcycle | null)[]> {
    const list = await this.model.findAll();

    if (!list) return [];

    return list.map((moto) => this.domain(moto));
  }

  public async listById(id: string): Promise<Motorcycle | null> {
    if (!isValidObjectId(id)) throw Error('Invalid mongo id');

    const selectedMotorcycle = await this.model.findById(id);

    if (!selectedMotorcycle) throw Error('Motorcycle not found');

    return this.domain(selectedMotorcycle);
  }
}