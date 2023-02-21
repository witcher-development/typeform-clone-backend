import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Survey } from '../surveys/entities/survey.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class SubmissionsService {
  create(createSubmissionDto: CreateSubmissionDto) {
    return 'This action adds a new submission';
  }

  findAll() {
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} submission`;
  }

  update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    return `This action updates a #${id} submission`;
  }

  remove(id: number) {
    return `This action removes a #${id} submission`;
  }
}
