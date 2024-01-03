import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAssignmentListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
