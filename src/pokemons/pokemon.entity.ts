import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, DeleteDateColumn, Entity, Repository } from 'typeorm';

import { BaseEntity } from 'App/core';
import { POKEMONS } from 'App/core/constant';

@Entity({ name: POKEMONS })
export class Pokemon extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  pokedexNumber: number;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @Column()
  attack: number;

  @ApiProperty()
  @Column()
  defense: number;

  @ApiProperty()
  @Column()
  stamina: number;

  @ApiPropertyOptional()
  @DeleteDateColumn()
  deletedAt: Date;
}

export type PokemonRepository = Repository<Pokemon>;
