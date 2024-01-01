import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentListEntity } from './entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAssignmentListDto, UpdateAssignmentListDto } from './dtos';
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

  async findAllAssignmentList(): Promise<AssignmentListEntity[]> {
    const assigmentList = await this.assignmentListRepository.find();

    if (!assigmentList || assigmentList.length === 0) {
      throw new NotFoundException(`assigmentList not found`);
    }

    return assigmentList;
  }

  async findAllAssignmentListByUserId(
    userId: string
  ): Promise<AssignmentListEntity[]> {
    await this.userService.findUserById(userId);

    const assignmentLists = await this.assignmentListRepository.find({
      where: { userId: userId },
      relations: ['assignments']
    });

    if (!assignmentLists || assignmentLists.length === 0) {
      throw new NotFoundException(
        `assignment list not found for user with Id: ${userId}`
      );
    }

    return assignmentLists;
  }

  async findAssignmentListById(listId: string): Promise<AssignmentListEntity> {
    const assignmentList = await this.assignmentListRepository.findOne({
      where: {
        id: listId
      },
      relations: ['assignments']
    });

    if (!assignmentList) {
      throw new NotFoundException(`list not found for user with Id ${listId}`);
    }

    return assignmentList;
  }

  async updateAssigmentList(
    assignmentlistId: string,
    updatedAssignmentList: UpdateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    const assigmentList = await this.findAssignmentListById(assignmentlistId);

    if (!assigmentList) {
      throw new NotFoundException(
        `list not found for user with Id ${assignmentlistId}`
      );
    }

    return this.assignmentListRepository.save({
      ...assigmentList,
      ...updatedAssignmentList
    });
  }

  async deleteAssignmentList(assignmentListId: string): Promise<DeleteResult> {
    const assignmentList = await this.findAssignmentListById(assignmentListId);

    const hasUncompletedAssignments = assignmentList.assignments.some(
      (assignment) => assignment.concluded === false
    );

    if (hasUncompletedAssignments) {
      throw new UnprocessableEntityException(
        'Existem tarefas não concluídas na lista.'
      );
    }

    return this.assignmentListRepository.delete({
      id: assignmentListId
    });
  }
}
