import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const config: MikroOrmModuleSyncOptions = {
  dbName: configService.get('DB_NAME'),
  user: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  driver: PostgreSqlDriver,
  autoLoadEntities: true,
};
