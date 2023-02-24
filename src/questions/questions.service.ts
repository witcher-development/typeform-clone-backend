import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Survey } from '@surveys/entities';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { buildQuestionContent, Question } from './entities';
import { validateIfAnyQuestionContentConflicts } from './questions.validators';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: EntityRepository<Survey>,
  ) {}

  async create(surveyId: string, { name, content }: CreateQuestionDto) {
    const survey = await this.surveyRepository.findOneOrFail({ id: surveyId });
    const newQuestion = new Question({ name }, survey);
    newQuestion.content = buildQuestionContent(content);
    await this.questionRepository.persistAndFlush(newQuestion);
    return newQuestion;
  }

  findAll(surveyId: string) {
    return this.questionRepository.find({ survey: { id: surveyId } });
  }

  findOne(id: string) {
    return this.questionRepository.findOneOrFail({ id }).catch((e) => {
      throw new BadRequestException(e.message);
    });
  }

  async update(id: string, { name, content }: UpdateQuestionDto) {
    const question = await this.findOne(id);
    validateIfAnyQuestionContentConflicts(question.content, content);
    question.name = name;
    question.content = buildQuestionContent(content);
    await this.questionRepository.persistAndFlush(question);
    return question;
  }

  async remove(id: string) {
    const question = await this.findOne(id);
    return this.questionRepository.removeAndFlush(question);
  }
}
