import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarsService } from './cars.service';
import { AutomakersService } from '../automakers/automakers.service';
import { MockCarsRepository } from '../../test/mocks/cars.repository.mock';
import { allCars } from '../../test/mocks/all-cars.mock';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

const mockCarsRepository = new MockCarsRepository();

describe('CarsService', () => {
  let service: CarsService;
  let carsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Car), useValue: createMockRepository() },
        { provide: AutomakersService, useValue: {} },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    carsRepository = module.get<MockRepository>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('When car with ID exists', () => {
      it('Should return the Car object', async () => {
        const carId = 8;
        const expectedCar = allCars[0];
        const mocked = await mockCarsRepository.findOne(carId);

        carsRepository.findOne.mockReturnValue(mocked);
        const car = await service.findOne(carId);
        expect(car).toEqual(expectedCar);
      });
    });
    describe('Otherwise', () => {
      it('Should throw the NotFoundException', async () => {
        const carId = 1;
        carsRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(carId);
          expect(false).toBeTruthy();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Car ${carId} not found`);
        }
      });
    });
  });
});
