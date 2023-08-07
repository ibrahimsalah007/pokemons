import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt } from 'class-validator';

export class CreatePokemonTypeDto {
  @ApiProperty()
  @IsInt()
  @IsDefined()
  pokemonId: number;

  @ApiProperty()
  @IsInt()
  @IsDefined()
  typeId: number;
}
