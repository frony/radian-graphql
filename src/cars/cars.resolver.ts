import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation(() => Car)
  createCar(@Args('createCarInput') createCarInput: CreateCarInput) {
    return this.carsService.create(createCarInput);
  }

  @Query(() => [Car], { name: 'GetAllCars' })
  findAll() {
    return this.carsService.findAll();
  }

  @Query(() => Car, { name: 'GetCarById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.carsService.findOne(id);
  }

  @Mutation(() => Car)
  updateCar(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCarInput') updateCarInput: UpdateCarInput,
  ) {
    return this.carsService.update(id, updateCarInput);
  }

  @Mutation(() => Car)
  removeCar(@Args('id', { type: () => Int }) id: number) {
    return this.carsService.remove(id);
  }
}
