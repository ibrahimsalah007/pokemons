import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

config();

/**
 * Custom Data source configuration for typeorm seeder
 */
export const seederDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/core/database/seed/*.js'],
  logger: 'advanced-console',
  migrationsTableName: 'seeds',
  namingStrategy: new SnakeNamingStrategy(),
};

const seedsDataSource = new DataSource(seederDataSourceOptions);

export default seedsDataSource;
