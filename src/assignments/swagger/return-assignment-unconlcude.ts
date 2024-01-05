import { ApiProperty } from '@nestjs/swagger';

export class ReturnUnconcludeAssignmentSwagger {
  @ApiProperty()
  id: 'string';
  @ApiProperty()
  description: 'string';
  @ApiProperty({ example: '1970-01-01T00:00:00.761Z' })
  deadLine: '1970-01-01T00:00:00.761Z';
  @ApiProperty()
  assignmentListId: 'string';
  @ApiProperty({ example: false })
  concluded: false;
  @ApiProperty()
  createAt: '2024-01-04T23:47:06.762Z';
  @ApiProperty()
  updateAt: '2024-01-04T23:47:06.762Z';
}
