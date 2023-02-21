import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isString } from 'lodash';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  QuestionContent,
  QuestionMultiSelectContent,
  QuestionTypes,
} from './entities/question-types';

export const isMultiSelectContent = (
  value: any,
): value is QuestionMultiSelectContent => {
  if (!value.options || !Array.isArray(value.options)) {
    return false;
  }

  if (value.options.length) {
    return value.options.every(
      (element) => Object.hasOwn(element, 'name') && isString(element.name),
    );
  }
  return true;
};

const isQuestionContent = (value): value is QuestionContent => {
  if (
    !value.content ||
    !Object.values(QuestionTypes).includes(value.content.type)
  ) {
    return false;
  }

  switch (value.content.type) {
    case QuestionTypes.String: {
      return true;
    }
    case QuestionTypes.Number: {
      return true;
    }
    case QuestionTypes.MultiSelect: {
      return isMultiSelectContent(value.content);
    }
    default: {
      return false;
    }
  }
};

@Injectable()
export class QuestionContentValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (metatype !== CreateQuestionDto) {
      return value;
    }

    if (!isQuestionContent(value)) {
      throw new BadRequestException(
        'Request body is not a valid question content',
      );
    }

    return value;
  }
}
