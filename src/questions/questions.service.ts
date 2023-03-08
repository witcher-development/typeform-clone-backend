import {
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import * as uuid from 'uuid';

import { Survey } from '@surveys/entities';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { buildQuestionContent, Question } from './entities';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: EntityRepository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: EntityRepository<Survey>,
  ) {}

  async create(surveyId: string, { id, name, content }: CreateQuestionDto) {
    const survey = await this.surveyRepository.findOneOrFail({ id: surveyId });

    const questionAlreadyExists = await this.questionRepository.findOne({ id });
    if (questionAlreadyExists) {
      const newId = uuid.v4();
      const newQuestion = new Question({ id: newId, name }, survey);
      newQuestion.content = buildQuestionContent(content);
      await this.questionRepository.persistAndFlush(newQuestion);
      throw new ConflictException({
        newId,
        newQuestion,
      });
    }

    const newQuestion = new Question({ id, name }, survey);
    newQuestion.content = buildQuestionContent(content);
    await this.questionRepository.persistAndFlush(newQuestion);
    return newQuestion;
  }

  findAll(surveyId: string) {
    return this.questionRepository.find({ survey: { id: surveyId } });
  }

  findOne(id: string) {
    return this.questionRepository.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }

  async update(id: string, { name, content }: UpdateQuestionDto) {
    const question = await this.findOne(id);
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
