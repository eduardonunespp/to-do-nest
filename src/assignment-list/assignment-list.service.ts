import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentListEntity } from './entity';
import { Repository } from 'typeorm';
import { CreateAssignmentListDto } from './dtos';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AssignmentListService {
  constructor(
    @InjectRepository(AssignmentListEntity)
    private readonly assignmentListRepository: Repository<AssignmentListEntity>,
    private readonly userService: UserService
  ) {}
  async createAssigmentList(
    createAssigmentListDto: CreateAssignmentListDto,
    userId: string
  ): Promise<AssignmentListEntity> {
    await this.userService.findUserById(userId);

    return this.assignmentListRepository.save({
      ...createAssigmentListDto,
      userId
    });
  }

  async findAssignmentList(): Promise<AssignmentListEntity[]> {
    return await this.assignmentListRepository.find();
  }

  async findAssignmentListById(
    listId: string
  ): Promise<AssignmentListEntity[]> {
    const assignmentList = await this.assignmentListRepository.find({
      where: {
        id: Number(listId)
      }
    });

    if (!assignmentList || assignmentList.length === 0) {
      throw new NotFoundException(`List not found for id ${listId}`);
    }

    return assignmentList;
  }
}
