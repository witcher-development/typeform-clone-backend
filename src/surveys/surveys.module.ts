import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Survey, Question])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
