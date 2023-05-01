import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarsService } from './cars.service';
import { AutomakersService } from '../automakers/automakers.service';
import { MockCarsRepository } from '../../test/mocks/cars.repository.mock';
import { allCars } from '../../test/mocks/all-cars.mock';
import { NotFoundException } from '@nestjs/common';
import { CarColor } from '../common/enums/car-color.enum';
import { CarMake } from '../common/enums/car-make.enum';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
});

const mockCarsRepository = new MockCarsRepository();

const MockDataSource = {
  createQueryRunner: () => {
    return {
      connect: () => true,
      startTransaction: () => true,
      commitTransaction: () => true,
      rollbackTransaction: () => true,
      release: () => true,
      manager: {
        save: (item) => item,
      },
    };
  },
};

const MockAutomakersService = {
  // findByMake: jest.fn(),
  findByMake: () => 'Toyota',
};

describe('CarsService', () => {
  let service: CarsService;
  let carsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        { provide: DataSource, useValue: MockDataSource },
        { provide: getRepositoryToken(Car), useValue: createMockRepository() },
        {
          provide: AutomakersService,
          useValue: MockAutomakersService,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    carsRepository = module.get<MockRepository>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAl', () => {
    describe('When cars have been saved in the database', () => {
      it('Should return a list of all cars', async () => {
        try {
          const mocked = mockCarsRepository.findAll();
          await carsRepository.find.mockResolvedValue(mocked);

          const cars = await service.findAll();
          expect(cars).toEqual(mocked);
        } catch (error) {
          console.log(error);
        }
      });
    });
    describe('Otherwise', () => {
      it('Should return an empty array', async () => {
        await carsRepository.find.mockResolvedValue([]);
        const cars = await service.findAll();
        expect(cars).toEqual([]);
      });
    });
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

  describe('create', () => {
    describe('When a car is successfully added to the database', () => {
      it('Should return the car object just added', async () => {
        const newCar = {
          Make: CarMake['TOYOTA'],
          Model: 'Camry',
          Year: 2010,
          Color: CarColor['BLUE'],
        };
        const createdCar = {
          VehicleID: '15',
          Make: 'TOYOTA',
          Model: 'Camry',
          Year: 2010,
          Color: 'BLUE',
          Automaker: {
            MakeId: '8',
            Make: 'Toyota',
          },
        };
        carsRepository.create.mockReturnValue(createdCar);
        const car = await service.create(newCar);
        expect(car).toEqual(createdCar);
      });
    });
  });

  describe('update', () => {
    describe('When a car is successfully updated in the database', () => {
      it('Should return the updated car object', async () => {
        const carId = 9;
        const updateCar = {
          Make: CarMake['TOYOTA'],
          Model: 'Camry',
          Year: 2010,
          Color: CarColor['BLUE'],
        };
        const carBeforeUpdate = {
          VehicleID: '15',
          Make: 'TOYOTA',
          Model: 'BLACK',
          Year: 2010,
          Color: 'BLUE',
        };
        const updatedCar = {
          VehicleID: '15',
          Make: 'TOYOTA',
          Model: 'Camry',
          Year: 2010,
          Color: 'BLUE',
          Automaker: {
            MakeId: '8',
            Make: 'Toyota',
          },
        };
        carsRepository.preload.mockReturnValue(carBeforeUpdate);
        carsRepository.update.mockReturnValue(updatedCar);
        carsRepository.save.mockReturnValue(updatedCar);
        const car = await service.update(15, updateCar);
        expect(car).toEqual(updatedCar);
      });
    });
  });
});
