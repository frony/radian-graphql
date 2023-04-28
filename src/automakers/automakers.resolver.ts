import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { AutomakersService } from './automakers.service';
import { Automaker } from './entities/automaker.entity';
import { CreateAutomakerInput } from './dto/create-automaker.input';
import { UpdateAutomakerInput } from './dto/update-automaker.input';

@Resolver(() => Automaker)
export class AutomakersResolver {
  constructor(private readonly automakersService: AutomakersService) {}

  @Mutation(() => Automaker)
  createAutomaker(
    @Args('createAutomakerInput') createAutomakerInput: CreateAutomakerInput,
  ) {
    return this.automakersService.create(createAutomakerInput);
  }

  @Query(() => [Automaker], { name: 'GetCarsByModel' })
  findAll() {
    return this.automakersService.findAll();
  }

  @Query(() => Automaker, { name: 'GetAutomakerById' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.automakersService.findOne(id);
  }

  @Mutation(() => Automaker)
  updateAutomaker(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateAutomakerInput') updateAutomakerInput: UpdateAutomakerInput,
  ) {
    return this.automakersService.update(id, updateAutomakerInput);
  }

  @Mutation(() => Automaker)
  removeAutomaker(@Args('id', { type: () => ID }) id: number) {
    return this.automakersService.remove(id);
  }
}
