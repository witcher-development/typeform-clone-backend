import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { QuestionContent } from '../entities';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsUUID(4)
  surveyId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  content: QuestionContent;
}
