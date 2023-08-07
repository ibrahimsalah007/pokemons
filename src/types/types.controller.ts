import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TypesService } from './types.service';
import { CreateTypeDto, UpdateTypeDto } from './dto';
import { PageOptionDto } from 'App/core';

@ApiTags('Types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  createType(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.createType(createTypeDto);
  }

  @Get()
  findAllTypes(@Query() query: any, @Query() pageOptionDto: PageOptionDto) {
    return this.typesService.findAllTypes(query, pageOptionDto);
  }

  @Get(':id')
  findOneType(@Param('id') id: number) {
    return this.typesService.findOneTypeOrFail({ id });
  }

  @Patch(':id')
  updateType(@Param('id') id: number, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.updateType({ id }, updateTypeDto);
  }

  @Delete(':id')
  removeType(@Param('id') id: number) {
    return this.typesService.removeType({ id });
  }
}
