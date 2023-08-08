import { FileService } from 'App/core/service/file.service';
import { Type } from 'App/types/type.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypes1691385777073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const typesRepository = await queryRunner.connection.getRepository(Type);

    const result = await FileService.readExcelToJson('Pokemon Go.xlsx', 'Sheet1', {
      columnToKey: {
        J: 'type_one',
        K: 'type_two',
      },
    });

    let types = [];

    result.map((item) => {
      item.type_one && types.push(item.type_one);
      item.type_two && types.push(item.type_two);
    });

    const uniqueTypes = new Set([...types]);

    types = [...uniqueTypes];

    await typesRepository.insert(types.map((type) => ({ name: type })));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const typesRepository = await queryRunner.connection.getRepository(Type);

    await typesRepository.clear();
  }
}
