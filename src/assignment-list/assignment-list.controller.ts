import { Body, Controller, Param, Post } from '@nestjs/common';
import { AssignmentListService } from './assignment-list.service';
import { AssignmentListEntity } from './entity';
import { CreateAssignmentListDto } from './dtos';

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
}
