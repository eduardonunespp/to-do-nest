import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatedAssignmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  deadLine: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
