import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { AutomakersService } from '../automakers/automakers.service';
import { Automaker } from '../automakers/entities/automaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Automaker])],
  providers: [CarsResolver, CarsService, AutomakersService],
  exports: [CarsService],
})
export class CarsModule {}
