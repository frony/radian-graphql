import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Car model' })
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
}
