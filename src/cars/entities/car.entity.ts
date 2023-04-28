import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  // JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Automaker } from '../../automakers/entities/automaker.entity';

@Entity()
@ObjectType({ description: 'Car entity' })
export class Car {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  VehicleID: number;

  @Column()
  Make: string;

  @Column()
  Model: string;

  @Column()
  Year: number;

  @Column()
  Color: string;

  @ManyToOne(() => Automaker, (automaker) => automaker.Cars, {
    cascade: ['insert', 'update'],
  })
  @Field(() => Automaker)
  Automaker?: Automaker;
}
