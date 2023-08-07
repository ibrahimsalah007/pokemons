import { TYPES } from 'App/core/constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTypes1691377280298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const typesTable = new Table({
      name: TYPES,
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

    await queryRunner.createTable(typesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TYPES);
  }
}
