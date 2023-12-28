import { IsString } from 'class-validator';

export class CreateAssignmentListDto {
  @IsString()
  name: string;
}
