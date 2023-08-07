import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
