import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';

import { allEntities } from './entities';

// for the app
export const getMikroOrmConfigForApp = (
  configService: ConfigService,
): MikroOrmModuleSyncOptions => ({
  entities: allEntities,
  dbName: configService.getOrThrow('DB_NAME'),
  user: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  driver: PostgreSqlDriver,
  autoLoadEntities: true,
  metadataProvider: TsMorphMetadataProvider,
  discovery: {
    requireEntitiesArray: true,
  },
});
