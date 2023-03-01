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
  constructor({ id, name }: Partial<CreateQuestionDto>, survey: Survey) {
    this.id = id;
    this.name = name;
    this.survey = survey;
  }

  @PrimaryKey()
  id: string;

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
