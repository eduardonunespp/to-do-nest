import { IsString } from 'class-validator';

export class UpdateAssignmentListDto {
  @IsString()
  name: string;
}
