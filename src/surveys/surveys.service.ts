import {
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Survey } from './entities';
import { CreateSurveyDto, UpdateSurveyDto } from './dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: EntityRepository<Survey>,
  ) {}

  async create({ id, name }: CreateSurveyDto) {
    const surveyAlreadyExists = await this.surveyRepository.findOne({ id });
    if (surveyAlreadyExists) {
      throw new ConflictException();
    }
    const newSurvey = new Survey({ id, name });
    await this.surveyRepository.persistAndFlush(newSurvey);
    return newSurvey;
  }

  findAll() {
    return this.surveyRepository.findAll();
  }

  findOne(id: string) {
    return this.surveyRepository.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    const survey = await this.findOne(id);
    wrap(survey).assign(updateSurveyDto);
    await this.surveyRepository.persistAndFlush(survey);
    return survey;
  }

  async remove(id: string) {
    const survey = await this.surveyRepository.findOneOrFail(id, {
      populate: ['questions'],
    });
    return this.surveyRepository.removeAndFlush(survey);
  }
}
