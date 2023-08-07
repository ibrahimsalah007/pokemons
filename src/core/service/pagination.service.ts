import { Injectable } from '@nestjs/common';

import { PageDto, PageMetaDto, PageOptionDto } from 'App/core/dto';

@Injectable()
export class PaginationService {
  static paginate<T>(rows: T[], count: number, pageOptionDto: PageOptionDto) {
    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptionDto,
    });

    return new PageDto(rows, pageMetaDto);
  }
}
