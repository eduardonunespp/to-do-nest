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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  ReturnCreateAssignmentSwagger,
  ReturnAssignemntsSwagger,
  ReturnUnconcludeAssignmentSwagger
} from './swagger';
import { ReturnOneAssignmentSwagger } from './swagger/return-one-assignment';
import { ReturnDeletedItemSwagger } from 'src/swagger';

@ApiTags('Assignments')
@ApiBearerAuth('KEY_AUTH')
@Roles(UserType.User)
@UsePipes(ValidationPipe)
@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentService: AssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new assignment ' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa adicionada com sucesso',
    type: ReturnCreateAssignmentSwagger
  })
  async createAssignment(
    @Body()
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    return await this.assignmentService.createAssignment(createAssignment);
  }

  @Get()
  @ApiOperation({ summary: 'Search assignments ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefas retornadas com sucesso',
    type: ReturnAssignemntsSwagger
  })
  @ApiQuery({ name: 'Page', required: false })
  @ApiQuery({ name: 'PerPage', required: false })
  async findAssignments(
    @UserId() userId: string,
    @Query('Page') page: number = 1,
    @Query('PerPage') limit: number = 10
  ): Promise<{ items: ReturnAssignmentDto[] }> {
    const assignments = await this.assignmentService.findAssignmentsByUserId(
      userId,
      page,
      limit
    );
    const mappedAssignments = assignments.map(
      (assignment) => new ReturnAssignmentDto(assignment)
    );
    return { items: mappedAssignments };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a assignment ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa retornada com sucesso',
    type: ReturnOneAssignmentSwagger
  })
  async findAssignmentsById(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.findAssignmentById(assignmentId)
    );
  }

  @Patch(':id/conclude')
  @ApiOperation({ summary: 'Conclude a task ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa concluída com sucesso',
    type: AssignmentEntity
  })
  async updatedAssignmentConclude(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedConcludeAssignment(assignmentId)
    );
  }

  @Patch(':id/unconclude')
  @ApiOperation({ summary: 'Desconclude a task ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa marcada como não concluída com sucesso',
    type: ReturnUnconcludeAssignmentSwagger
  })
  async updatedAssignmentUnconclude(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedUnconcludeAssignment(assignmentId)
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a assignment ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa deletada com sucesso',
    type: ReturnDeletedItemSwagger
  })
  async deleteAssignment(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<DeleteResult> {
    return this.assignmentService.deleteAssignment(assignmentId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a assignment ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa editada com sucesso',
    type: UpdatedAssignmentDto
  })
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
