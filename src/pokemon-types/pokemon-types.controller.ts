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
  createPokemonType(@Body() createPokemonTypeDto: CreatePokemonTypeDto) {
    return this.pokemonTypesService.createPokemonType(createPokemonTypeDto);
  }

  @Get()
  findAllPokemonTypes(@Query() query: any, @Query() pageOptionDto: PageOptionDto) {
    return this.pokemonTypesService.findAllPokemonTypes(query, pageOptionDto);
  }

  @Get(':id')
  findOnePokemonType(@Param('id') id: number) {
    return this.pokemonTypesService.findOnePokemonTypeOrFail({ id });
  }

  @Patch(':id')
  updatePokemonType(@Param('id') id: number, @Body() updatePokemonTypeDto: UpdatePokemonTypeDto) {
    return this.pokemonTypesService.updatePokemonType({ id }, updatePokemonTypeDto);
  }

  @Delete(':id')
  removePokemonType(@Param('id') id: number) {
    return this.pokemonTypesService.removePokemonType({ id });
  }
}
