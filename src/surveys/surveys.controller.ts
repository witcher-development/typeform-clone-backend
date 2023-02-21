import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionContentValidationPipe } from './surveys.validators';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Post('questions')
  @UsePipes(new QuestionContentValidationPipe())
  createQuestion(
    @Param('id') surveyId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.surveysService.createQuestion(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.surveysService.findAll();
  }

  @Get('/questions')
  findAllQuestions() {
    return this.surveysService.findAllQuestions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(+id, updateSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(+id);
  }
}
