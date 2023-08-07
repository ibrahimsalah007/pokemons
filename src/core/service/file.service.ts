import { Injectable } from '@nestjs/common';
import ExcelToJson from 'convert-excel-to-json';
import { existsSync } from 'fs';

@Injectable()
export class FileService {
  /**
   * @description Reading xlsx file and convert it into json
   * @param filePath path of the xlsx file
   * @param options Defining which columns should be returned and how they should be named on the result object
   * @example readExcelToJson('pokemons.xlsx', 'Sheet1', {A: 'id', B: 'ProductName'})
   * @resource https://www.npmjs.com/package/convert-excel-to-json
   */
  static async readExcelToJson(filePath: string, sheetName: string, options = { columnToKey: {} }) {
    const isFileExist = existsSync(filePath);

    if (!isFileExist) throw new Error('File Doesn`t exist');

    const result = ExcelToJson({
      sheets: [sheetName],
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      columnToKey: !options.columnToKey ? { '*': '{{columnHeader}}' } : options.columnToKey,
    });

    return result[sheetName];
  }
}
