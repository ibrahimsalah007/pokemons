import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { LoggerModule } from 'nestjs-pino';
import { addTransactionalDataSource } from 'typeorm-transactional';

import environmentVariablesSchema from './core/config/environment-variable.schema';
import { TypeOrmConfigService } from './core/database';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TypesModule } from './types/types.module';
import { PokemonTypesModule } from './pokemon-types/pokemon-types.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentVariablesSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return addTransactionalDataSource(dataSource);
      },
    }),
    PokemonsModule,
    TypesModule,
    PokemonTypesModule,
  ],
  controllers: [],
})
export class AppModule {}
