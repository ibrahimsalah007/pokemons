import { Logger } from '@nestjs/common';
import { FileService } from 'App/core/service/file.service';
import { PokemonType } from 'App/pokemon-types/pokemon-type.entity';
import { Type } from 'App/types/type.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePokemonTypes1691387124519 implements MigrationInterface {
  logger = new Logger('Create Pokemon');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.verbose('Getting Repositories');

    const pokemonTypesRepository = await queryRunner.connection.getRepository(PokemonType);
    const typesRepository = await queryRunner.connection.getRepository(Type);

    this.logger.verbose('Loading File Data');

    const result = await FileService.readExcelToJson('Pokemon Go.xlsx', 'Sheet1', {
      columnToKey: {
        A: 'id',
        B: 'name',
        J: 'type_one',
        K: 'type_two',
      },
    });

    this.logger.verbose('Finding Types');

    const types = await typesRepository.find();

    this.logger.verbose('Constructing pokemon types objects to the corresponding types');

    const pokemonTypeObjects = result.map((item) => {
      const typeOne = item.type_one;
      const typeTwo = item.type_two;

      const pokemonTypeObject = { pokemonId: item.id, types: [] };

      if (typeOne) pokemonTypeObject.types.push(types.find((type) => type.name == typeOne).id);
      if (typeTwo) pokemonTypeObject.types.push(types.find((type) => type.name == typeTwo).id);

      return pokemonTypeObject;
    });

    this.logger.verbose('Constructing pokemon types objects');

    const pokemonTypes = [];

    pokemonTypeObjects.forEach((item) => {
      item.types.forEach((type) => {
        pokemonTypes.push({ pokemonId: item.pokemonId, typeId: type });
      });
    });

    this.logger.verbose('Inserting pokemon types objects...');

    await pokemonTypesRepository.insert(pokemonTypes);

    this.logger.verbose('Insert Completed');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const pokemonTypesRepository = await queryRunner.connection.getRepository(PokemonType);

    await pokemonTypesRepository.clear();
  }
}
