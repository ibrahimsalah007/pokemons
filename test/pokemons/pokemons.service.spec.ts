import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePokemonDto, UpdatePokemonDto } from 'App/pokemons/dto';
import { Pokemon } from 'App/pokemons/pokemon.entity';
import { PokemonsService } from 'App/pokemons/pokemons.service';
describe('PokemonsService', () => {
  let service: PokemonsService;

  const pokemons: Pokemon[] = [
    {
      id: 1,
      name: 'Bulbasaur',
      image: 'Path',
      pokedexNumber: 1,
      attack: 100,
      defense: 100,
      stamina: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      name: 'Ivysaur',
      image: 'Path',
      pokedexNumber: 1,
      attack: 100,
      defense: 100,
      stamina: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      name: 'Venusaur',
      image: 'Path',
      pokedexNumber: 1,
      attack: 100,
      defense: 100,
      stamina: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  const mockPokemonsRepository = {
    find: jest.fn().mockImplementation(() => Promise.resolve(pokemons)),
    findAndCount: jest.fn().mockImplementation(() => Promise.resolve([pokemons, 3])),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(pokemons[0])),
    save: jest.fn().mockImplementation((pokemon) => Promise.resolve({ id: 1, ...pokemon })),
    update: jest.fn().mockImplementation((query, pokemonDto) => Promise.resolve({ raw: [pokemonDto] })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonsService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: mockPokemonsRepository,
        },
      ],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Pokemon', () => {
    it('should create a new pokemon and return it', async () => {
      const pokemonDto: CreatePokemonDto = {
        name: 'Pokemon One',
        image: 'Path',
        pokedexNumber: 1,
        attack: 100,
        defense: 100,
        stamina: 100,
      };

      const createdPokemon = await service.createPokemon(pokemonDto);

      expect(createdPokemon).toEqual({
        id: expect.any(Number),
        ...pokemonDto,
      });
    });
  });

  describe('Find All pokemons', () => {
    it('should return a list of paginated pokemons', async () => {
      const pokemonsList = await service.findAllPokemons({}, { skip: 0, limit: 10 });

      expect(mockPokemonsRepository.findAndCount).toBeCalled();
      expect(pokemonsList.data).toBeDefined();
      expect(pokemonsList.data).toHaveLength(pokemons.length);
      expect(pokemonsList.data).toEqual(pokemons);
    });
  });

  describe('Find One pokemon', () => {
    it('should return One Pokemon', async () => {
      const pokemonQuery = { id: 1 };
      const expectedPokemon = pokemons[0];

      const pokemon = await service.findOnePokemonOrFail(pokemonQuery);

      expect(mockPokemonsRepository.findOne).toBeCalled();
      expect(pokemon).toEqual(expectedPokemon);
    });
  });

  describe('Update pokemon', () => {
    it('should Update a Pokemon', async () => {
      const pokemonQuery = { id: 1 };

      const updatePokemonDto: UpdatePokemonDto = {
        name: 'Updated Name',
      };

      const pokemon = await service.updatePokemon(pokemonQuery, updatePokemonDto);

      expect(mockPokemonsRepository.update).toBeCalled();
      expect(pokemon.raw[0]?.name).toEqual(updatePokemonDto.name);
    });
  });
});
