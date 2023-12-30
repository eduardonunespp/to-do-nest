import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAssignmentListById(listId: string): Promise<AssignmentListEntity> {
    const assignmentList = await this.assignmentListRepository.findOne({
      where: {
        id: Number(listId)
      },
      relations: ['assignments']
    });

    if (!assignmentList) {
      throw new NotFoundException(`list not found for id ${listId}`);
    }

    return assignmentList;
  }

  async updateAssigmentList(
    assignmentlistId: string,
    updatedAssignmentList: UpdateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    const assigmentList = await this.findAssignmentListById(assignmentlistId);

    if (!assigmentList) {
      throw new NotFoundException(`list not found for id ${assignmentlistId}`);
    }

    return this.assignmentListRepository.save({
      ...assigmentList,
      ...updatedAssignmentList
    });
  }

  async deleteAssignmentList(assignmentListId: string): Promise<DeleteResult> {
    const assignmentList = await this.assignmentListRepository
      .createQueryBuilder('assignmentList')
      .leftJoinAndSelect('assignmentList.assignments', 'assignments')
      .where('assignmentList.id = :id', { id: Number(assignmentListId) })
      .getOne();

    if (!assignmentList) {
      // Lida com a situação em que a AssignmentListEntity não foi encontrada
      throw new NotFoundException(
        `Assignment List with ID ${assignmentListId} not found`
      );
    }

    return this.assignmentListRepository.delete({
      id: Number(assignmentListId)
    });
  }
}
