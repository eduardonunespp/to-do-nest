import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AssignmentListService } from './assignment-list.service';
import { AssignmentListEntity } from './entity';
import { CreateAssignmentListDto, UpdateAssignmentListDto } from './dtos';
import { ReturnAssignmentListDto } from './dtos/return-assignment-list.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserType } from 'src/user/enum';
import { UserId } from 'src/core/decorators/user-id.decorator';

@Roles(UserType.User)
@UsePipes(ValidationPipe)
@Controller('assignment-list')
export class AssignmentListController {
  constructor(private assigmentListService: AssignmentListService) {}

  @Post()
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
  async findAssignmentList(
    @UserId() userId: string
  ): Promise<ReturnAssignmentListDto[]> {
    return (
      await this.assigmentListService.findAllAssignmentListByUserId(userId)
    ).map((assignmentList) => new ReturnAssignmentListDto(assignmentList));
  }

  @Get(':id')
  async findAssignmentListById(
    @Param('id', new ParseUUIDPipe()) assignmentListId: string
  ): Promise<ReturnAssignmentListDto> {
    return new ReturnAssignmentListDto(
      await this.assigmentListService.findAssignmentListById(assignmentListId)
    );
  }

  @Patch(':id')
  async updateAssignmentList(
    @Param('id', new ParseUUIDPipe()) assignmentListId: string,
    @Body() updatedAssignmentList: UpdateAssignmentListDto
  ): Promise<ReturnAssignmentListDto> {
    return new ReturnAssignmentListDto(
      await this.assigmentListService.updateAssigmentList(
        assignmentListId,
        updatedAssignmentList
      )
    );
  }

  @Delete(':id')
  async deleteAssignmentList(
    @Param('id', new ParseUUIDPipe()) assignmentListId: string
  ): Promise<DeleteResult> {
    return this.assigmentListService.deleteAssignmentList(assignmentListId);
  }
}
