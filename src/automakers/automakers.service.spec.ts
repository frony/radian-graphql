import { Test, TestingModule } from '@nestjs/testing';
import { AutomakersService } from './automakers.service';

describe('AutomakersService', () => {
  let service: AutomakersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomakersService],
    }).compile();

    service = module.get<AutomakersService>(AutomakersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
