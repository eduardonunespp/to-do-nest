import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAssignmentListDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
