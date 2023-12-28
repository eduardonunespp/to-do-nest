import { Module } from '@nestjs/common';
import { AssignmentListService } from './assignment-list.service';
import { AssignmentListController } from './assignment-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentListEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentListEntity])],
  providers: [AssignmentListService],
  controllers: [AssignmentListController]
})
export class AssignmentListModule {}
