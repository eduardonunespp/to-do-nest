import { ApiProperty } from '@nestjs/swagger';
import { ReturnAssignmentDto } from '../dtos';

export class ReturnAssignemntsSwagger {
  @ApiProperty({ type: ReturnAssignmentDto, isArray: true })
  items: ReturnAssignemntsSwagger;
}
