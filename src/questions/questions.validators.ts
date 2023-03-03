import * as uuid from 'uuid';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import isString from 'lodash/isString';

import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import {
  QuestionContent,
  QuestionMultiSelectContent,
  QuestionTypes,
} from './entities';

export const isMultiSelectContent = (
  value: any,
): value is QuestionMultiSelectContent => {
  if (!value.options || !Array.isArray(value.options)) {
    return false;
  }

  if (value.options.length) {
    return value.options.every(
      (element) =>
        Object.hasOwn(element, 'name') &&
        isString(element.name) &&
        Object.hasOwn(element, 'id') &&
        uuid.validate(element.id) &&
        uuid.version(element.id) === 4,
    );
  }
  return true;
};

const isQuestionContent = (value): value is QuestionContent => {
  if (!value || !Object.values(QuestionTypes).includes(value.type)) {
    return false;
  }

  switch (value.type) {
    case QuestionTypes.String: {
      return Object.hasOwn(value, 'type') && Object.keys(value).length === 1;
    }
    case QuestionTypes.Number: {
      return Object.hasOwn(value, 'type') && Object.keys(value).length === 1;
    }
    case QuestionTypes.MultiSelect: {
      return isMultiSelectContent(value);
    }
    default: {
      return false;
    }
  }
};

@Injectable()
export class QuestionContentValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (metatype !== CreateQuestionDto && metatype !== UpdateQuestionDto) {
      return value;
    }

    if (!isQuestionContent(value.content)) {
      throw new BadRequestException(
        'Request body is not a valid question content',
      );
    }

    return value;
  }
}
