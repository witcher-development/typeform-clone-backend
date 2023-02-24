import { IsNotEmpty, IsString } from 'class-validator';
import { QuestionContent } from '../entities';

export class CreateQuestionDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  content: QuestionContent;
}
