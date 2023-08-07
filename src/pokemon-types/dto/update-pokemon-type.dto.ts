import { PartialType } from '@nestjs/swagger';
import { CreatePokemonTypeDto } from './create-pokemon-type.dto';

export class UpdatePokemonTypeDto extends PartialType(CreatePokemonTypeDto) {}
