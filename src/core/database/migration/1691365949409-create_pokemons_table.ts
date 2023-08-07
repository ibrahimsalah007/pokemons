import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { POKEMONS } from 'App/core/constant';

export class CreatePokemonsTable1691365949409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pokemonsTable = new Table({
      name: POKEMONS,
      columns: [
        {
          name: 'id',
          type: 'int',
          generatedIdentity: 'ALWAYS',
          generationStrategy: 'increment',
          isGenerated: true,
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'pokedex_number',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'image',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'attack',
          type: 'int',
          isNullable: false,
          default: 0,
        },
        {
          name: 'defense',
          type: 'int',
          isNullable: false,
          default: 0,
        },
        {
          name: 'stamina',
          type: 'int',
          isNullable: false,
          default: 0,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: true,
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    });

    await queryRunner.createTable(pokemonsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(POKEMONS);
  }
}
