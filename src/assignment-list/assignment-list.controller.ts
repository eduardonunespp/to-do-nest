import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AssignmentListService } from './assignment-list.service';
import { AssignmentListEntity } from './entity';
import {
  CreateAssignmentListDto,
  ReturnAssignmentListUpdatedDto,
  UpdateAssignmentListDto
} from './dtos';
import { ReturnAssignmentListDto } from './dtos/return-assignment-list.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserType } from 'src/user/enum';
import { UserId } from 'src/core/decorators/user-id.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Assignment-List')
@Roles(UserType.User)
@UsePipes(ValidationPipe)
@Controller('assignment-list')
export class AssignmentListController {
  constructor(private assigmentListService: AssignmentListService) {}

  @Post()
  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Add a new to-do list' })
  async createAssigmentListDto(
    @UserId() id: string,
    @Body() createAssigmentList: CreateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    return await this.assigmentListService.createAssigmentList(
      createAssigmentList,
      id
    );
  }

  @Get()
  @ApiOperation({ summary: 'Search to-do list ' })
  async findAssignmentList(
    @UserId() userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<ReturnAssignmentListDto[]> {
    return (
      await this.assigmentListService.findAllAssignmentListByUserId(
        userId,
        page,
        limit
      )
    ).map((assignmentList) => new ReturnAssignmentListDto(assignmentList));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a to-do list ' })
  async findAssignmentListById(
    @Param('id', new ParseUUIDPipe()) assignmentListId: string
  ): Promise<ReturnAssignmentListDto> {
    return new ReturnAssignmentListDto(
      await this.assigmentListService.findAssignmentListById(assignmentListId)
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a to-do list' })
  async updateAssignmentList(
    @Param('id', new ParseUUIDPipe()) assignmentListId: string,
    @Body() updatedAssignmentList: UpdateAssignmentListDto
  ): Promise<ReturnAssignmentListDto> {
    return new ReturnAssignmentListUpdatedDto(
      await this.assigmentListService.updateAssigmentList(
        assignmentListId,
        updatedAssignmentList
      )
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a to-do list ' })
  async deleteAssignmentList(
    @Param('id', new ParseUUIDPipe()) assignmentListId: string
  ): Promise<DeleteResult> {
    return this.assigmentListService.deleteAssignmentList(assignmentListId);
  }
}
