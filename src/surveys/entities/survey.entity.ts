import * as uuid from 'uuid';
import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';

import { CreateSurveyDto } from '../dto/create-survey.dto';
import { Question } from './question.entity';

@Entity()
export class Survey {
  constructor({ name }: CreateSurveyDto) {
    this.name = name;
  }

  @PrimaryKey()
  id: string = uuid.v4();

  @Property()
  name: string;

  @OneToMany(() => Question, (question) => question.survey)
  questions = new Collection<Question>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
