import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../../cars/entities/car.entity';

@Entity()
@ObjectType()
export class Automaker {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  MakeId: number;

  @Column()
  Make: string;

  @OneToMany(() => Car, (car) => car.Automaker)
  @Field(() => [Car])
  Cars?: Car[];
}
