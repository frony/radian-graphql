import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutomakerInput } from './dto/create-automaker.input';
import { UpdateAutomakerInput } from './dto/update-automaker.input';
import { Automaker } from './entities/automaker.entity';

@Injectable()
export class AutomakersService {
  constructor(
    @InjectRepository(Automaker)
    private readonly automakersRepository: Repository<Automaker>,
  ) {}

  create(createAutomakerInput: CreateAutomakerInput) {
    return this.automakersRepository.create(createAutomakerInput);
  }

  findAll() {
    return this.automakersRepository.find({
      relations: { Cars: true },
    });
  }

  async findOne(id: number) {
    const automaker = await this.automakersRepository.findOne({
      where: { MakeId: +id },
      relations: { Cars: true },
    });
    if (!automaker) {
      throw new NotFoundException(`Automaker ${id} does not exist`);
    }
    return automaker;
  }

  async findByMake(make: string): Promise<Automaker | null> {
    const automaker = await this.automakersRepository.findOne({
      where: { Make: make },
    });
    if (automaker) {
      return automaker;
    }
    return null;
  }

  async update(id: number, updateAutomakerInput: UpdateAutomakerInput) {
    const automaker = await this.automakersRepository.preload({
      MakeId: id,
      ...updateAutomakerInput,
    });
    if (!automaker) {
      throw new NotFoundException(`Automaker ${id} does not exist`);
    }
    return this.automakersRepository.save(automaker);
  }

  async remove(id: number) {
    const automaker = await this.findOne(id);
    const response = await this.automakersRepository.remove(automaker);
    return response;
  }
}
