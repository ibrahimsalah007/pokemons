import { POKEMONS, POKEMON_TYPES, TYPES } from 'App/core/constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePokemonTypes1691378329984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pokemonTypesTable = new Table({
      name: POKEMON_TYPES,
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
          name: 'pokemon_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'type_id',
          type: 'int',
          isNullable: false,
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
      foreignKeys: [
        {
          columnNames: ['pokemon_id'],
          referencedColumnNames: ['id'],
          referencedTableName: POKEMONS,
        },
        {
          columnNames: ['type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TYPES,
        },
      ],
    });

    await queryRunner.createTable(pokemonTypesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(POKEMON_TYPES);
  }
}
