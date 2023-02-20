import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { QuestionContent } from '../entities/question-types';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsUUID(4)
  surveyId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionContent)
  content: QuestionContent;
}
