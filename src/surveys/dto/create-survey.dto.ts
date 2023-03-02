import { IsUUID } from 'class-validator';

import { UpdateSurveyDto } from './update-survey.dto';

export class CreateSurveyDto extends UpdateSurveyDto {
  @IsUUID(4)
  id: string;
}
