import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAutomakerInput {
  @IsNotEmpty()
  @IsString()
  Make: string;
}
