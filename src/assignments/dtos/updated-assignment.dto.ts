import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatedAssignmentDto {
  @ApiProperty({ example: 'Nome de tarefa' })
  @IsNotEmpty()
  @IsString()
  deadLine: string;

  @ApiProperty({ example: 'Descrição de tarefa' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
