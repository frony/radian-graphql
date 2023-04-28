import { Test, TestingModule } from '@nestjs/testing';
import { AutomakersResolver } from './automakers.resolver';
import { AutomakersService } from './automakers.service';

describe('AutomakersResolver', () => {
  let resolver: AutomakersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomakersResolver, AutomakersService],
    }).compile();

    resolver = module.get<AutomakersResolver>(AutomakersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
