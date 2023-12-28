import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './entity';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dtos';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentsRepository: Repository<AssignmentEntity>
  ) {}
  async createAssignment(
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    return this.assignmentsRepository.save({
      ...createAssignment
    });
  }
}
