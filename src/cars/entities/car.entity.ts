import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Automaker } from '../../automakers/entities/automaker.entity';
import { CarColor } from '../../common/enums/car-color.enum';
import { CarMake } from '../../common/enums/car-make.enum';

@Entity()
@ObjectType({ description: 'Car entity' })
export class Car {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  VehicleID: number;

  @Column()
  Make: CarMake;

  @Column()
  Model: string;

  @Column()
  Year: number;

  @Column()
  Color: CarColor;

  @ManyToOne(() => Automaker, (automaker) => automaker.Cars, {
    cascade: ['insert', 'update'],
  })
  @Field(() => Automaker)
  Automaker?: Automaker;
}
