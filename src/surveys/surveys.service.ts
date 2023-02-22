import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Survey, Question } from './entities';
import { CreateSurveyDto, UpdateSurveyDto, CreateQuestionDto } from './dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: EntityRepository<Survey>,
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const newSurvey = new Survey(createSurveyDto);
    await this.surveyRepository.persistAndFlush(newSurvey);
    return newSurvey;
  }

  async createQuestion({ name, content, surveyId }: CreateQuestionDto) {
    const survey = await this.surveyRepository.findOne({ id: surveyId });
    const newQuestion = new Question({ name, content }, survey);
    await this.questionRepository.persistAndFlush(newQuestion);
    return newQuestion;
  }

  findAll() {
    return this.surveyRepository.findAll();
  }

  async findAllQuestions() {
    return this.questionRepository.findAll();
  }

  findOne(id: string) {
    return this.surveyRepository.findOne({ id });
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    const survey = await this.findOne(id);
    wrap(survey).assign(updateSurveyDto);
    await this.surveyRepository.persistAndFlush(survey);
    return survey;
  }

  async remove(id: string) {
    const survey = await this.findOne(id);
    return this.surveyRepository.removeAndFlush(survey);
  }
}
