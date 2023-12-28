import { IsDate, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  description: string;

  @IsDate()
  deadLine: string;

  assignmentListId: string;
}
