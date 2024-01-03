import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  deadLine: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  assignmentListId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
