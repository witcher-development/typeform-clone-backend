import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Survey } from '@surveys/entities';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { Question } from './entities';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: EntityRepository<Survey>,
  ) {}

  async create(surveyId: string, { name, content }: CreateQuestionDto) {
    const survey = await this.surveyRepository.findOne({ id: surveyId });
    const newQuestion = new Question({ name, content }, survey);
    await this.questionRepository.persistAndFlush(newQuestion);
    return newQuestion;
  }

  findAll(surveyId: string) {
    return this.questionRepository.find({ survey: { id: surveyId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
