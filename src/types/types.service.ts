import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTypeDto, UpdateTypeDto } from './dto';
import { Type, TypeRepository } from './type.entity';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { PageOptionDto, PaginationService } from 'App/core';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: TypeRepository,
  ) {}

  async createType(createTypeDto: CreateTypeDto) {
    return this.typeRepository.save(createTypeDto);
  }

  async findAllTypes(query: FindManyOptions<Type> = {}, pageOptionsDto?: PageOptionDto) {
    const [types, count] = await this.typeRepository.findAndCount({
      where: query.where,
      select: query.select,
      relations: query.relations,
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.limit,
    });

    return PaginationService.paginate<Type>(types, count, pageOptionsDto);
  }

  async findOneTypeOrFail(query: FindOptionsWhere<Type>) {
    const type = this.typeRepository.findOne({ where: query });

    if (!type) throw new NotFoundException('Type not found');

    return type;
  }

  async updateType(query: FindOptionsWhere<Type>, updateTypeDto: UpdateTypeDto) {
    await this.findOneTypeOrFail(query);

    return (await this.typeRepository.update(query, updateTypeDto)).raw[0];
  }

  async removeType(query: FindOptionsWhere<Type>) {
    await this.findOneTypeOrFail(query);

    await this.typeRepository.softDelete(query);
  }
}
