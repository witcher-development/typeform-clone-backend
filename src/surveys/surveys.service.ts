import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} survey`;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
