import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentEntity])],
  providers: [AssignmentsService],
  controllers: [AssignmentsController]
})
export class AssignmentsModule {}
