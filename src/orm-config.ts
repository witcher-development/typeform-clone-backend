import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';

import { Survey } from './surveys/entities/survey.entity';
import { Question } from './surveys/entities/question.entity';
import {
  QuestionStringContent,
  QuestionNumberContent,
  QuestionMultiSelectContent,
  MultiSelectOption,
} from './surveys/entities/question-types';

const configService = new ConfigService();

const MikroOrmConfig: MikroOrmModuleSyncOptions = {
  entities: [
    Survey,
    Question,
    QuestionStringContent,
    QuestionNumberContent,
    QuestionMultiSelectContent,
    MultiSelectOption,
  ],
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
};

export default MikroOrmConfig;
