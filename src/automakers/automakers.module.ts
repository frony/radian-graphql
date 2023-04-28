import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomakersService } from './automakers.service';
import { AutomakersResolver } from './automakers.resolver';
import { Car } from '../cars/entities/car.entity';
import { CarsService } from '../cars/cars.service';
import { Automaker } from './entities/automaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Automaker])],
  providers: [AutomakersResolver, AutomakersService, CarsService],
  exports: [AutomakersService],
})
export class AutomakersModule {}
