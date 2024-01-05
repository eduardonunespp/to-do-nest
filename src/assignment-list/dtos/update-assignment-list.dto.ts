import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAssignmentListDto {
  @ApiProperty({ description: 'Lista Editada com sucesso', example: 'Lista01' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
