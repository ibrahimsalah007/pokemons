import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CreatePokemonTypeDto, UpdatePokemonTypeDto } from './dto';
import { PokemonType, PokemonTypeRepository } from './pokemon-type.entity';
import { PageOptionDto, PaginationService } from 'App/core';

@Injectable()
export class PokemonTypesService {
  constructor(
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: PokemonTypeRepository,
  ) {}

  async createPokemonType(createPokemonTypeDto: CreatePokemonTypeDto): Promise<PokemonType>;
  async createPokemonType(createPokemonTypeDto: CreatePokemonTypeDto[]): Promise<PokemonType[]>;

  @Transactional()
  async createPokemonType(
    createPokemonTypeDto: CreatePokemonTypeDto | CreatePokemonTypeDto[],
  ): Promise<PokemonType | PokemonType[]> {
    if (Array.isArray(createPokemonTypeDto)) return this.pokemonTypeRepository.save(createPokemonTypeDto);

    return this.pokemonTypeRepository.save(createPokemonTypeDto);
  }

  async findAllPokemonTypes(query: FindOptionsWhere<PokemonType> = {}, pageOptionsDto?: PageOptionDto) {
    const [pokemonTypes, count] = await this.pokemonTypeRepository.findAndCount({
      where: query,
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.limit,
    });

    return PaginationService.paginate<PokemonType>(pokemonTypes, count, pageOptionsDto);
  }

  async findOnePokemonTypeOrFail(query: FindOptionsWhere<PokemonType>) {
    const pokemonTypes = this.pokemonTypeRepository.findOne({ where: query });

    if (!pokemonTypes) throw new NotFoundException('Pokemon Type not found');

    return pokemonTypes;
  }

  async updatePokemonType(query: FindOptionsWhere<PokemonType>, updatePokemonTypeDto: UpdatePokemonTypeDto) {
    await this.findOnePokemonTypeOrFail(query);

    return (await this.pokemonTypeRepository.update(query, updatePokemonTypeDto)).raw[0];
  }

  async removePokemonType(query: FindOptionsWhere<PokemonType>) {
    await this.findOnePokemonTypeOrFail(query);

    await this.pokemonTypeRepository.softDelete(query);
  }
}
