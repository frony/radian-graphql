import { CreateCarInput } from './create-car.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Update car input object input' })
export class UpdateCarInput extends PartialType(CreateCarInput) {}
