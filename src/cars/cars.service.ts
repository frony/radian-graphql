import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './entities/car.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from '@nestjs/apollo';
import { AutomakersService } from '../automakers/automakers.service';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
    private readonly automakersService: AutomakersService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCarDto: CreateCarInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { Make } = createCarDto;
      let automaker = await this.automakersService.findByMake(Make);
      if (!automaker) {
        const newAutomaker = await this.automakersService.create({ Make });
        automaker = await queryRunner.manager.save(newAutomaker);
      }
      const car = await this.carsRepository.create({
        ...createCarDto,
        Automaker: automaker,
      });
      if (!car) {
        throw new BadRequestException('Please review your entries');
      }
      const savedCar = await queryRunner.manager.save(car);
      await queryRunner.commitTransaction();
      return savedCar;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.carsRepository.find({
      relations: { Automaker: true },
    });
  }

  async findOne(id: number) {
    const car = await this.carsRepository.findOne({
      where: { VehicleID: +id },
      relations: { Automaker: true },
    });
    if (!car) {
      throw new UserInputError(`Coffee ${id} does not exist`);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarInput) {
    const car = await this.carsRepository.preload({
      VehicleID: +id,
      ...updateCarDto,
    });
    if (!car) {
      throw new NotFoundException(`Car #${id} not found`);
    }
    return this.carsRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return this.carsRepository.remove(car);
  }
}
