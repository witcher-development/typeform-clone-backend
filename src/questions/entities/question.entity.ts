import * as uuid from 'uuid';
import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Embedded,
} from '@mikro-orm/core';

import { Survey } from '@surveys/entities';
import { CreateQuestionDto } from '../dto';
import {
  QuestionStringContent,
  QuestionNumberContent,
  QuestionMultiSelectContent,
} from './question-types';

@Entity()
export class Question {
  constructor({ name, content }: Partial<CreateQuestionDto>, survey: Survey) {
    this.name = name;
    this.content = content;
    this.survey = survey;
  }

  @PrimaryKey()
  id: string = uuid.v4();

  @Property()
  name: string;

  @ManyToOne()
  readonly survey: Survey;

  @Embedded(() => [
    QuestionStringContent,
    QuestionNumberContent,
    QuestionMultiSelectContent,
  ])
  content:
    | QuestionStringContent
    | QuestionNumberContent
    | QuestionMultiSelectContent;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
