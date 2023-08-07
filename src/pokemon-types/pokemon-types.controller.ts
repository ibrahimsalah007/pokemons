import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonTypesService } from './pokemon-types.service';
import { CreatePokemonTypeDto } from './dto/create-pokemon-type.dto';
import { UpdatePokemonTypeDto } from './dto/update-pokemon-type.dto';

@Controller('pokemon-types')
export class PokemonTypesController {
  constructor(private readonly pokemonTypesService: PokemonTypesService) {}

  @Post()
  create(@Body() createPokemonTypeDto: CreatePokemonTypeDto) {
    return this.pokemonTypesService.create(createPokemonTypeDto);
  }

  @Get()
  findAll() {
    return this.pokemonTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonTypeDto: UpdatePokemonTypeDto) {
    return this.pokemonTypesService.update(+id, updatePokemonTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonTypesService.remove(+id);
  }
}
