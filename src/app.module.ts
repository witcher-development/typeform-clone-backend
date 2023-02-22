import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { getMikroOrmConfigForApp } from './orm-config';

import { SurveysModule } from '@surveys/surveys.module';
import { QuestionsModule } from './questions/questions.module';
// import { SubmissionsModule } from './submissions/submissions.module';

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
        ...getMikroOrmConfigForApp(configService),
        entities: [],
      }),
    }),
    SurveysModule,
    QuestionsModule,
    // SubmissionsModule,
    RouterModule.register([
      {
        path: 'surveys',
        module: SurveysModule,
        children: [
          {
            path: '/:surveyId/questions',
            module: QuestionsModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
