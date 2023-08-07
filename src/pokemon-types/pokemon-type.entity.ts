import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, DeleteDateColumn, Entity, Repository } from 'typeorm';

import { BaseEntity } from 'App/core';
import { POKEMON_TYPES } from 'App/core/constant';

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
}

export type PokemonTypeRepository = Repository<PokemonType>;
