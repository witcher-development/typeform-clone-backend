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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionContentValidationPipe } from './questions.validators';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UsePipes(new QuestionContentValidationPipe())
  create(
    @Param('surveyId') surveyId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    // await new Promise((res) => setTimeout(res, 5000));
    return this.questionsService.create(surveyId, createQuestionDto);
  }

  @Get()
  findAll(@Param('surveyId') surveyId: string) {
    return this.questionsService.findAll(surveyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new QuestionContentValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
