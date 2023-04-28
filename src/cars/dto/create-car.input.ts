import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CarColor } from '../../common/enums/car-color.enum';
import { CarMake } from '../../common/enums/car-make.enum';

@InputType({ description: 'Create car input object input' })
export class CreateCarInput {
  @IsNotEmpty()
  @IsString()
  Make: CarMake;

  @IsNotEmpty()
  @IsString()
  Model: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  Year: number;

  @IsNotEmpty()
  @IsString()
  Color: CarColor;
}
