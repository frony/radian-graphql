import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from '@nestjs/apollo';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarInput) {
    const car = await this.carsRepository.create(createCarDto);
    if (!car) {
      throw new BadRequestException('Please review your entries');
    }
    return this.carsRepository.save(car);
  }

  findAll() {
    return this.carsRepository.find();
  }

  async findOne(id: number) {
    const car = await this.carsRepository.findOne({
      where: { VehicleID: +id },
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
