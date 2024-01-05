import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAssignmentListDto {
  @ApiProperty({ description: 'Nome da Tarefa', example: 'exampleAssignment' })
  @IsString()
  name: string;
}
