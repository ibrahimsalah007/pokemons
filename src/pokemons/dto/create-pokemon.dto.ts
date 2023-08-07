import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePokemonDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsDefined()
  pokedexNumber: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsInt()
  @IsDefined()
  attack: number;

  @ApiProperty()
  @IsInt()
  @IsDefined()
  defense: number;

  @ApiProperty()
  @IsInt()
  @IsDefined()
  stamina: number;
}
