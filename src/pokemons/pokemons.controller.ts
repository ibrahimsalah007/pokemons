import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { PageOptionDto } from 'App/core';

@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  createPokemon(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonsService.createPokemon(createPokemonDto);
  }

  @Get()
  findAllPokemons(@Query() query: any, pageOptionDto: PageOptionDto) {
    return this.pokemonsService.findAllPokemons(query, pageOptionDto);
  }

  @Get(':id')
  findOnePokemon(@Param('id') id: number) {
    return this.pokemonsService.findOnePokemonOrFail({ id });
  }

  @Patch(':id')
  updatePokemon(@Param('id') id: number, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonsService.updatePokemon({ id }, updatePokemonDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removePokemon(@Param('id') id: number) {
    return this.pokemonsService.removePokemon({ id });
  }
}
