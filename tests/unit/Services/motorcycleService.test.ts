import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testes da rota /motorcycle', function () {
  const service = new MotorcycleService();

  const motoMock: IMotorcycle = {
    model: 'Honda Cb 600f Hornet 1',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const resMock: IMotorcycle = {
    id: '6348513f34c397abcad040b2',
    model: 'Honda Cb 600f Hornet 1',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const motoListMock: IMotorcycle[] = [
    {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    },
    {
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    },
  ];

  it('criação de uma moto com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(resMock);

    const newCar = await service.create(motoMock);

    expect(newCar).to.be.deep.equal(resMock);

    sinon.restore();
  });

  it('listar motos com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(motoListMock);

    const list = await service.listAllMotos();

    expect(list).to.be.deep.equal(motoListMock);

    sinon.restore();
  });

  it('listar moto específica através do id com sucesso', async function () {
    sinon.stub(Model, 'findById').resolves(resMock);

    const list = await service.listById('6348513f34c397abcad040b2');

    expect(list).to.be.deep.equal(resMock);

    sinon.restore();
  });

  it('retornar erro caso o id seja inválido', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      await service.listById('null');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }

    sinon.restore();
  });
});