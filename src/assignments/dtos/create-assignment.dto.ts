import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  deadLine: string;

  @IsNotEmpty()
  @IsString()
  assignmentListId: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
