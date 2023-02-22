import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isString } from 'lodash';

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
      (element) => Object.hasOwn(element, 'name') && isString(element.name),
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

/**
 * It's okay if:
 *  - IDs missing in 'changed', because they were deleted.
 *  - There are changed options without ID, because they are newly created and didn't get an ID assigned yet.
 *  - Existing question content is not of type 'multi-select', because question type was changed.
 * It's NOT okay if:
 *  - There are extra IDs in 'changed', because all IDs are generated on server.
 *
 * @returns item an unexpected item if finds.
 */
const checkUnexpectedMultiSelectOptionIds = (
  existingContent: QuestionContent,
  changedContent: QuestionMultiSelectContent,
) => {
  const existingIds = (
    existingContent.type === QuestionTypes.MultiSelect
      ? existingContent.options
      : []
  ).map(({ id }) => id);
  const changedIds = changedContent.options
    .map(({ id }) => id)
    .filter((id) => !!id);

  return changedIds.find((id) => !existingIds.includes(id));
};
export const validateIfAnyQuestionContentConflicts = (
  existingQuestion: QuestionContent,
  changedQuestion: QuestionContent,
) => {
  switch (changedQuestion.type) {
    case QuestionTypes.String: {
      return true;
    }
    case QuestionTypes.Number: {
      return true;
    }
    case QuestionTypes.MultiSelect: {
      const unexpectedOptions = checkUnexpectedMultiSelectOptionIds(
        existingQuestion,
        changedQuestion,
      );
      if (unexpectedOptions) {
        throw new BadRequestException(
          'Multi-select question content is corrupted',
        );
      }
      return false;
    }
    default: {
      return false;
    }
  }
};
