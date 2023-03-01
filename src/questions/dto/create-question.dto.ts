import { IsUUID } from 'class-validator';

import { UpdateQuestionDto } from './update-question.dto';

export class CreateQuestionDto extends UpdateQuestionDto {
  @IsUUID()
  id: string;
}
