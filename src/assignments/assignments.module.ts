import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentEntity } from './entity';
import { AssignmentListModule } from 'src/assignment-list/assignment-list.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentEntity]), AssignmentListModule],
  providers: [AssignmentsService],
  controllers: [AssignmentsController]
})
export class AssignmentsModule {}
