import { CreateAutomakerInput } from './create-automaker.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAutomakerInput extends PartialType(CreateAutomakerInput) {}
