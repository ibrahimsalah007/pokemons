import { FileService } from 'App/core/service/file.service';
import { Pokemon } from 'App/pokemons/pokemon.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePokemons1691382015916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pokemonRepository = await queryRunner.connection.getRepository(Pokemon);

    const result = await FileService.readExcelToJson('Pokemon Go.xlsx', 'Sheet1', {
      columnToKey: {
        A: 'id',
        B: 'name',
        C: 'pokedexNumber',
        D: 'image',
        O: 'attack',
        P: 'defense',
        Q: 'stamina',
      },
    });

    await pokemonRepository.insert(result);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const pokemonRepository = await queryRunner.connection.getRepository(Pokemon);

    await pokemonRepository.clear();
  }
}
