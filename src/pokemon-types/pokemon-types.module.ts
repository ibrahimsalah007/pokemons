import { Module } from '@nestjs/common';
import { PokemonTypesService } from './pokemon-types.service';
import { PokemonTypesController } from './pokemon-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonType } from './pokemon-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonType])],
  controllers: [PokemonTypesController],
  providers: [PokemonTypesService],
  exports: [PokemonTypesService],
})
export class PokemonTypesModule {}
