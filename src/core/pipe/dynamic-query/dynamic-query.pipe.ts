import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {
  Between,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsSelect,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

interface QueryControls<T> {
  filter?: any;
  search?: string;
  select: FindOptionsSelect<T>;
  include: FindOptionsRelations<T>;
}
@Injectable()
export class FindOptionsBuilderPipe<T> implements PipeTransform {
  private readonly operatorMap = {
    eq: (value: any) => value,
    neq: (value: any) => Not(value),
    gt: (value: any) => MoreThan(value),
    gte: (value: any) => MoreThanOrEqual(value),
    lt: (value: any) => LessThan(value),
    lte: (value: any) => LessThanOrEqual(value),
    in: (value: any) => In(value),
    between: (value: any) => Between(value.split(',')[0], value.split(',')[1]),
  };

  transform(value: QueryControls<T>) {
    const query: FindManyOptions<T> = {
      where: {},
    };

    /**
     * @param filter represent incoming fields that has to be filtered based on given criteria
     */
    const filters = value.filter;

    /**
     * @param search represent incoming value to search for
     */
    const search = value.search;

    /**
     * @param relations represent relations that has to be included in the response
     */
    const relations = value.include;

    /**
     * @param relations represent fields that has to be selected in the response
     */
    const select = value.select;

    if (relations) query.select = select;
    if (relations) query.relations = relations;
    if (search) query.where['name'] = ILike(`%${search}%`);

    for (const field in filters) {
      const operator = Object.keys(filters[field])[0];

      const fieldValue = filters[field][operator];

      query.where[field] = this.buildOperator(operator, fieldValue);
    }

    return query;
  }

  private buildOperator(operator: string, value: any) {
    const mappedOperator = this.operatorMap[operator];

    if (mappedOperator) {
      return mappedOperator(value);
    }

    throw new BadRequestException(`Unsupported operator: ${operator}`);
  }
}
