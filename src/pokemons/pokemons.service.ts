import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon, PokemonRepository } from './pokemon.entity';
import { PageOptionDto, PaginationService } from 'App/core';
import { FindOptionsWhere } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { PokemonTypesService } from 'App/pokemon-types/pokemon-types.service';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: PokemonRepository,
    private readonly pokemonTypeService: PokemonTypesService,
  ) {}

  @Transactional()
  async createPokemon({ types, ...createPokemonDto }: CreatePokemonDto) {
    const pokemon = await this.pokemonRepository.save(createPokemonDto);

    await this.pokemonTypeService.createPokemonType(pokemon.id, types);

    return pokemon;
  }

  async findAllPokemons(query: FindOptionsWhere<Pokemon> = {}, pageOptionsDto?: PageOptionDto) {
    const [pokemons, count] = await this.pokemonRepository.findAndCount({
      where: query,
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.limit,
    });

    return PaginationService.paginate<Pokemon>(pokemons, count, pageOptionsDto);
  }

  async findOnePokemonOrFail(query: FindOptionsWhere<Pokemon>) {
    const pokemon = this.pokemonRepository.findOne({ where: query });

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    return pokemon;
  }

  async updatePokemon(query: FindOptionsWhere<Pokemon>, updatePokemonDto: UpdatePokemonDto) {
    await this.findOnePokemonOrFail(query);

    // return (await this.pokemonRepository.update(query, updatePokemonDto)).raw[0];
  }

  async removePokemon(query: FindOptionsWhere<Pokemon>): Promise<void> {
    await this.findOnePokemonOrFail(query);

    await this.pokemonRepository.softDelete(query);
  }
}
