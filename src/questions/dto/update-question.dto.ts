import { IsNotEmpty, IsString } from 'class-validator';
import { QuestionContent } from '@questions/entities';

export class UpdateQuestionDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  content: QuestionContent;
}
