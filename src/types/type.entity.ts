import { Column, DeleteDateColumn, Entity } from 'typeorm';

import { TYPES } from 'App/core/constant';
import { BaseEntity } from 'App/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: TYPES })
export class Type extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional()
  @DeleteDateColumn()
  deletedAt: Date;
}
