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
  Query,
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Assignments')
@ApiBearerAuth('KEY_AUTH')
@Roles(UserType.User)
@UsePipes(ValidationPipe)
@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentService: AssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new assignment ' })
  async createAssignment(
    @Body()
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    return await this.assignmentService.createAssignment(createAssignment);
  }

  @Get()
  @ApiOperation({ summary: 'Search assignments ' })
  async findAssignments(
    @UserId() userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<ReturnAssignmentDto[]> {
    return (
      await this.assignmentService.findAssignmentsByUserId(userId, page, limit)
    ).map((assignment) => new ReturnAssignmentDto(assignment));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a assignment ' })
  async findAssignmentsById(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.findAssignmentById(assignmentId)
    );
  }

  @Patch(':id/conclude')
  @ApiOperation({ summary: 'Conclude a task ' })
  async updatedAssignmentConclude(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedConcludeAssignment(assignmentId)
    );
  }

  @Patch(':id/unconclude')
  @ApiOperation({ summary: 'Desconclude a task ' })
  async updatedAssignmentUnconclude(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedUnconcludeAssignment(assignmentId)
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a assignment ' })
  async deleteAssignment(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<DeleteResult> {
    return this.assignmentService.deleteAssignment(assignmentId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a assignment ' })
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
