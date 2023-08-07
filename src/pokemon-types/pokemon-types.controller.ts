import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PokemonTypesService } from './pokemon-types.service';
import { CreatePokemonTypeDto, UpdatePokemonTypeDto } from './dto';
import { PageOptionDto } from 'App/core';

@ApiTags('Pokemons')
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
    @Query() query: any,
    @Query() pageOptionDto: PageOptionDto,
  ) {
    return this.pokemonTypesService.findAllPokemonTypes({ ...query, pokemonId }, pageOptionDto);
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
