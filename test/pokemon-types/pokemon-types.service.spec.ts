import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypesService } from '../../src/pokemon-types/pokemon-types.service';

describe('PokemonTypesService', () => {
  let service: PokemonTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonTypesService],
    }).compile();

    service = module.get<PokemonTypesService>(PokemonTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
