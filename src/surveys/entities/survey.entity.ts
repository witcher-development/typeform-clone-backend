import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { CreateSurveyDto } from '../dto';
import { Question } from '@questions/entities';

@Entity()
export class Survey {
  constructor({ id, name }: CreateSurveyDto) {
    this.id = id;
    this.name = name;
  }

  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: [Cascade.REMOVE],
  })
  questions = new Collection<Question>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
