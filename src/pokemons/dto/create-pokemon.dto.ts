import { ApiProperty } from '@nestjs/swagger';
import { CreatePokemonTypeDto } from 'App/pokemon-types/dto';
import { Type } from 'class-transformer';

import { IsArray, IsDefined, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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

  @ApiProperty({ type: () => CreatePokemonTypeDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePokemonTypeDto)
  types: CreatePokemonTypeDto[];
}
