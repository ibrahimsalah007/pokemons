import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { Pokemon } from './pokemon.entity';
import { PokemonTypesModule } from 'App/pokemon-types/pokemon-types.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon]), PokemonTypesModule],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
