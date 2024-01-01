import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AssignmentEntity } from './entity';
import {
  CreateAssignmentDto,
  ReturnAssignmentDto,
  UpdatedAssignmentDto
} from './dtos';
import { AssignmentsService } from './assignments.service';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserType } from 'src/user/enum';
import { UserId } from 'src/core/decorators/user-id.decorator';

@Roles(UserType.User)
@UsePipes(ValidationPipe)
@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentService: AssignmentsService) {}

  @Post()
  async createAssignment(
    @Body()
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    return await this.assignmentService.createAssignment(createAssignment);
  }

  @Get()
  async findAssignments(
    @UserId() userId: string
  ): Promise<ReturnAssignmentDto[]> {
    return (await this.assignmentService.findAssignmentsByUserId(userId)).map(
      (assignment) => new ReturnAssignmentDto(assignment)
    );
  }

  @Get(':id')
  async findAssignmentsById(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.findAssignmentById(assignmentId)
    );
  }

  @Patch(':id/conclude')
  async updatedAssignmentConclude(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedConcludeAssignment(assignmentId)
    );
  }

  @Patch(':id/unconclude')
  async updatedAssignmentUnconclude(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedUnconcludeAssignment(assignmentId)
    );
  }

  @Delete(':id')
  async deleteAssignment(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<DeleteResult> {
    return this.assignmentService.deleteAssignment(assignmentId);
  }

  @Put(':id')
  async updateAssigment(
    @Param('id', new ParseUUIDPipe()) assignmentId: string,
    @Body() assignmentUpdated: UpdatedAssignmentDto
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updateAssignment(
        assignmentId,
        assignmentUpdated
      )
    );
  }
}
