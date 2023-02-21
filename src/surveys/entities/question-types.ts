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
  constructor() {
    super();
    this.type = QuestionTypes.String;
  }
}

@Embeddable({ discriminatorValue: QuestionTypes.Number })
export class QuestionNumberContent extends QuestionContentAbstract {
  constructor() {
    super();
    this.type = QuestionTypes.Number;
  }
}

export class MultiSelectOption {
  public name: string;
  public id?: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id || uuid.v4();
  }
}
@Embeddable({ discriminatorValue: QuestionTypes.MultiSelect })
export class QuestionMultiSelectContent extends QuestionContentAbstract {
  @Property({ type: 'json' })
  options: MultiSelectOption[];

  constructor(options: MultiSelectOption[]) {
    super();
    this.type = QuestionTypes.MultiSelect;
    this.options = options.map(
      ({ id, name }) => new MultiSelectOption(name, id),
    );
  }
}

export type QuestionContent =
  | QuestionStringContent
  | QuestionNumberContent
  | QuestionMultiSelectContent;
