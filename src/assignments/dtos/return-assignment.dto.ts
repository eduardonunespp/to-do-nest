import { ApiProperty } from '@nestjs/swagger';
import { AssignmentEntity } from '../entity';

export class ReturnAssignmentDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  deadline: Date;
  @ApiProperty()
  concludeAt: Date;
  @ApiProperty()
  assignmentListId: string;
  @ApiProperty()
  concluded: boolean;

  constructor(assignment: AssignmentEntity) {
    this.id = assignment.id;
    this.description = assignment.description;
    this.deadline = assignment.deadLine;
    this.assignmentListId = assignment.assignmentListId;
    this.concluded = assignment.concluded;
    this.concludeAt = assignment.concludeAt;
  }
}
