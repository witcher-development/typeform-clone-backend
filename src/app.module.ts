import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { getMikroOrmConfigForApp } from './orm-config';

import { SurveysModule } from '@surveys/surveys.module';
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
    // SubmissionsModule,
  ],
})
export class AppModule {}
