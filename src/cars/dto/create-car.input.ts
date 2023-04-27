import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType({ description: 'Create car input object input' })
export class CreateCarInput {
  @IsNotEmpty()
  @IsString()
  Make: string;

  @IsNotEmpty()
  @IsString()
  Model: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  Year: number;

  @IsNotEmpty()
  @IsString()
  Color: string;
}
