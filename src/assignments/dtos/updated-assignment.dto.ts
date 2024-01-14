import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatedAssignmentDto {
  @ApiProperty({ example: '2030-01-01T03:00:00.000Z' })
  @IsNotEmpty()
  @IsString()
  deadLine: string;

  @ApiProperty({ example: 'Descrição de tarefa' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
