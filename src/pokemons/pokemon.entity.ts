import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, Repository } from 'typeorm';

import { BaseEntity } from 'App/core';
import { POKEMONS, POKEMON_TYPES } from 'App/core/constant';
import { Type } from 'App/types/type.entity';
import { PokemonType } from 'App/pokemon-types/pokemon-type.entity';

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

  @ApiProperty()
  @OneToMany(() => PokemonType, (pokemonType) => pokemonType.pokemon)
  pokemonTypes: PokemonType[];

  @ApiProperty()
  @ManyToMany(() => Type)
  @JoinTable({
    name: POKEMON_TYPES,
    joinColumn: {
      name: 'pokemon_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'type_id',
      referencedColumnName: 'id',
    },
  })
  types: Type[];
}

export type PokemonRepository = Repository<Pokemon>;
