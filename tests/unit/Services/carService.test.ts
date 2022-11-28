import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Teste da rota /car', function () {
  const service = new CarService();

  const mockCar: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const resMock: ICar = {
    id: '6348513f34c397abcad040b2',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const updateMock: ICar = {
    model: 'Marea',
    year: 2008,
    color: 'White',
    status: false,
    buyValue: 30.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const updatedMock: ICar = {
    id: '6377e9d04bb28538d964ff7e',
    model: 'Marea',
    year: 2008,
    color: 'White',
    status: false,
    buyValue: 30.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const carListMock: ICar[] = [
    {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    },
    {
      id: '634852326b35b59438fbea31',
      model: 'Tempra',
      year: 1995,
      color: 'Black',
      buyValue: 39,
      doorsQty: 2,
      seatsQty: 5,
    },
  ];

  it('criação de um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(resMock);

    const newCar = await service.create(mockCar);

    expect(newCar).to.be.deep.equal(resMock);

    sinon.restore();
  });

  it('listar carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(carListMock);

    const list = await service.listAllCars();

    expect(list).to.be.deep.equal(carListMock);

    sinon.restore();
  });

  it('listar carro específico através do id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(resMock);

    const list = await service.listById('6348513f34c397abcad040b2');

    expect(list).to.be.deep.equal(resMock);

    sinon.restore();
  });

  it('atualizar um carro através do id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMock);

    const car = await service.updateCar('6377e9d04bb28538d964ff7e', updateMock);

    expect(car).to.be.deep.equal(updatedMock);
  });
});