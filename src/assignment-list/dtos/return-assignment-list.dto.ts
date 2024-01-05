import { ReturnAssignmentDto } from 'src/assignments/dtos';
import { AssignmentListEntity } from '../entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnAssignmentListDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;

  @ApiProperty()
  assignments?: ReturnAssignmentDto[];

  constructor(assignmentListEntity: AssignmentListEntity) {
    this.id = assignmentListEntity.id;
    this.name = assignmentListEntity.name;
    this.assignments = assignmentListEntity.assignments
      ? assignmentListEntity.assignments.map(
          (assignment) => new ReturnAssignmentDto(assignment)
        )
      : undefined;
  }
}
