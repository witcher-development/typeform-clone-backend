import { IsUUID } from 'class-validator';

import { UpdateQuestionDto } from './update-question.dto';

export class CreateQuestionDto extends UpdateQuestionDto {
  @IsUUID(4)
  id: string;
}
