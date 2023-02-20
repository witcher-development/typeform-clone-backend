import * as uuid from 'uuid';
import { Embeddable, Embedded, Enum, Property } from '@mikro-orm/core';

export enum QuestionTypes {
  String = 'string',
  Number = 'number',
  MultiSelect = 'multi-select',
  Matrix = 'matrix',
}

@Embeddable({ abstract: true, discriminatorColumn: 'type' })
export abstract class QuestionContentAbstract {
  @Enum()
  type!: QuestionTypes;
}

@Embeddable({ discriminatorValue: QuestionTypes.String })
export class QuestionStringContent extends QuestionContentAbstract {
  type = QuestionTypes.String;
}

@Embeddable({ discriminatorValue: QuestionTypes.Number })
export class QuestionNumberContent extends QuestionContentAbstract {
  type = QuestionTypes.Number;
}

@Embeddable()
export class MultiSelectOption {
  constructor(name: string) {
    this.name = name;
  }

  @Property()
  id: string = uuid.v4();

  @Property()
  name: string;
}
@Embeddable({ discriminatorValue: QuestionTypes.MultiSelect })
export class QuestionMultiSelectContent extends QuestionContentAbstract {
  type = QuestionTypes.MultiSelect;

  @Embedded()
  options: MultiSelectOption[];

  constructor(options: string[]) {
    super();
    this.options = options.map((o) => new MultiSelectOption(o));
  }
}

export type QuestionContent =
  | QuestionStringContent
  | QuestionNumberContent
  | QuestionMultiSelectContent;
