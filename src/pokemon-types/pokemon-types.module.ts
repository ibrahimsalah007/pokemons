import { Module } from '@nestjs/common';
import { PokemonTypesService } from './pokemon-types.service';
import { PokemonTypesController } from './pokemon-types.controller';

@Module({
  controllers: [PokemonTypesController],
  providers: [PokemonTypesService]
})
export class PokemonTypesModule {}
