import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, DeleteDateColumn, Entity, ManyToOne, Repository } from 'typeorm';

import { BaseEntity } from 'App/core';
import { POKEMON_TYPES } from 'App/core/constant';
import { Pokemon } from 'App/pokemons/pokemon.entity';

@Entity({ name: POKEMON_TYPES })
export class PokemonType extends BaseEntity {
  @ApiProperty()
  @Column()
  pokemonId: number;

  @ApiProperty()
  @Column()
  typeId: number;

  @ApiPropertyOptional()
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty()
  @ManyToOne(() => Pokemon, (pokemon) => pokemon.pokemonTypes)
  pokemon: Pokemon;
}

export type PokemonTypeRepository = Repository<PokemonType>;
