import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AssignmentEntity } from './entity';
import { CreateAssignmentDto, ReturnAssignmentDto } from './dtos';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentService: AssignmentsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createAssignment(
    @Body()
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    return await this.assignmentService.createAssignment(createAssignment);
  }

  @Get()
  async findAssignments(): Promise<ReturnAssignmentDto[]> {
    return (await this.assignmentService.findAssignments()).map(
      (assignment) => new ReturnAssignmentDto(assignment)
    );
  }

  @Get(':id')
  async findAssignmentsById(
    @Param('id') assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.findAssignmentById(assignmentId)
    );
  }

  @Patch(':id/conclude')
  async updatedAssignmentConclude(
    @Param('id') assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedConcludeAssignment(assignmentId)
    );
  }

  @Patch(':id/unconclude')
  async updatedAssignmentUnconclude(
    @Param('id') assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedUnconcludeAssignment(assignmentId)
    );
  }
}
