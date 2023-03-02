import { IsString } from 'class-validator';

export class UpdateSurveyDto {
  @IsString()
  name: string;
}
