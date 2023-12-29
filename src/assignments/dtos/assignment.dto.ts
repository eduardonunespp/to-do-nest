import { IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  deadLine: string;

  @IsString()
  assignmentListId: string;

  @IsString()
  description: string;
}
