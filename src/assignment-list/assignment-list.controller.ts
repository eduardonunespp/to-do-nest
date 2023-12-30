import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { AssignmentListService } from './assignment-list.service';
import { AssignmentListEntity } from './entity';
import { CreateAssignmentListDto, UpdateAssignmentListDto } from './dtos';
import { ReturnAssignmentListDto } from './dtos/return-assignment-list.dto';
import { DeleteResult } from 'typeorm';

@Controller('assignment-list')
export class AssignmentListController {
  constructor(private assigmentListService: AssignmentListService) {}

  @Post(':id')
  async createAssigmentListDto(
    @Param('id') id: string,
    @Body() createAssigmentList: CreateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    return await this.assigmentListService.createAssigmentList(
      createAssigmentList,
      id
    );
  }

  @Get()
  async findAssignmentList(): Promise<ReturnAssignmentListDto[]> {
    return (await this.assigmentListService.findAllAssignmentList()).map(
      (assignmentList) => new ReturnAssignmentListDto(assignmentList)
    );
  }

  @Get(':id')
  async findAssignmentListById(
    @Param('id') assignmentListId: string
  ): Promise<ReturnAssignmentListDto> {
    return new ReturnAssignmentListDto(
      await this.assigmentListService.findAssignmentListById(assignmentListId)
    );
  }

  @Patch(':id')
  async updateAssignmentList(
    @Param('id') assignmentListId: string,
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
    @Param('id') assignmentListId: string
  ): Promise<DeleteResult> {
    return this.assigmentListService.deleteAssignmentList(assignmentListId);
  }
}
