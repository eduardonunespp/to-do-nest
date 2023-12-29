import { AssignmentEntity } from '../entity';

export class ReturnAssignmentDto {
  id: number;
  description: string;
  deadline: Date;
  concludeAt: Date;
  assignmentListId: string;
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
