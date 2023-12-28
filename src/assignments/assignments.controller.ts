import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssignmentEntity } from './entity';
import { CreateAssignmentDto } from './dtos';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentService: AssignmentsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createAssignment(
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    return await this.assignmentService.createAssignment(createAssignment);
  }
}
