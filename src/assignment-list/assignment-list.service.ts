import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentListEntity } from './entity';
import { Repository } from 'typeorm';
import { CreateAssignmentListDto } from './dtos';

@Injectable()
export class AssignmentListService {
  constructor(
    @InjectRepository(AssignmentListEntity)
    private readonly assignmentListRepository: Repository<AssignmentListEntity>
  ) {}
  async createAssigmentList(
    createAssigmentListDto: CreateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    return this.assignmentListRepository.save({
      ...createAssigmentListDto
    });
  }
}
