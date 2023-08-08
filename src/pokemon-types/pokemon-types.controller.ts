import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PokemonTypesService } from './pokemon-types.service';
import { CreatePokemonTypeDto, UpdatePokemonTypeDto } from './dto';
import { FindOptionsBuilderPipe, PageOptionDto } from 'App/core';
import { PokemonType } from './pokemon-type.entity';
import { FindManyOptions } from 'typeorm';

@ApiTags('Pokemon Types')
@Controller('pokemons/:pokemonId/types')
export class PokemonTypesController {
  constructor(private readonly pokemonTypesService: PokemonTypesService) {}

  @Post()
  createPokemonType(@Param('pokemonId') pokemonId: number, @Body() createPokemonTypeDto: CreatePokemonTypeDto) {
    return this.pokemonTypesService.createPokemonType(pokemonId, createPokemonTypeDto);
  }

  @Get()
  findAllPokemonTypes(
    @Param('pokemonId') pokemonId: number,
    @Query(new FindOptionsBuilderPipe<PokemonType>()) query: FindManyOptions<PokemonType>,
    @Query() pageOptionDto: PageOptionDto,
  ) {
    query.where['pokemonId'] = pokemonId;

    return this.pokemonTypesService.findAllPokemonTypes(query, pageOptionDto);
  }

  @Get(':id')
  findOnePokemonType(@Param('pokemonId') pokemonId: number, @Param('id') id: number) {
    return this.pokemonTypesService.findOnePokemonTypeOrFail({ id, pokemonId });
  }

  @Patch(':id')
  updatePokemonType(
    @Param('pokemonId') pokemonId: number,
    @Param('id') id: number,
    @Body() updatePokemonTypeDto: UpdatePokemonTypeDto,
  ) {
    return this.pokemonTypesService.updatePokemonType({ id, pokemonId }, updatePokemonTypeDto);
  }

  @Delete(':id')
  removePokemonType(@Param('pokemonId') pokemonId: number, @Param('id') id: number) {
    return this.pokemonTypesService.removePokemonType({ id, pokemonId });
  }
}
