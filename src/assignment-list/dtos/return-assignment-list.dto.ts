import { ReturnAssignmentDto } from 'src/assignments/dtos';
import { AssignmentListEntity } from '../entity';

export class ReturnAssignmentListDto {
  id: number;
  name: string;
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
