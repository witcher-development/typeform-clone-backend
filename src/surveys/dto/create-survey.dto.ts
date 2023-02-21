import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSurveyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
