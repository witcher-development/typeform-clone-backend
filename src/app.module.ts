import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveysModule } from './surveys/surveys.module';
import { Survey } from './surveys/entities/survey.entity';
import { Question } from './surveys/entities/question.entity';
import {
  MultiSelectOption,
  QuestionMultiSelectContent,
  QuestionNumberContent,
  QuestionStringContent,
} from './surveys/entities/question-types';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: [
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
      }),
    }),
    SurveysModule,
    SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
