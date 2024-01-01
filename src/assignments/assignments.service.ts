import {
  Injectable,
  NotFoundException,
  ParseUUIDPipe,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAssignmentDto, UpdatedAssignmentDto } from './dtos';
import { AssignmentListService } from 'src/assignment-list/assignment-list.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentsRepository: Repository<AssignmentEntity>,
    private readonly userService: UserService,
    private readonly assignmentListService: AssignmentListService
  ) {}
  async createAssignment(
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    await this.assignmentListService.findAssignmentListById(
      createAssignment.assignmentListId
    );

    const parseUUIDPipe = new ParseUUIDPipe({ version: '4' });

    const assignmentListId = await parseUUIDPipe.transform(
      createAssignment.assignmentListId,
      {
        type: 'body',
        metatype: String,
        data: ''
      }
    );

    const date = createAssignment.deadLine;
    const formattedDate = new Date(date);

    if (formattedDate < new Date()) {
      throw new UnprocessableEntityException(
        'a data de conclusão deve ser maior que a data atual'
      );
    }

    return await this.assignmentsRepository.save({
      ...createAssignment,
      assignmentListId,
      deadLine: formattedDate
    });
  }

  async findAssignments(): Promise<AssignmentEntity[]> {
    const assignments = await this.assignmentsRepository.find();

    if (!assignments || assignments.length === 0) {
      throw new NotFoundException(`assignments not found`);
    }

    return assignments;
  }

  async findAssignmentsByUserId(userId: string): Promise<AssignmentEntity[]> {
    const user = await this.userService.findUserById(userId);

    if (!user.assigmentList || user.assigmentList.length === 0) {
      throw new NotFoundException(`assignments not found`);
    }

    const assignments: AssignmentEntity[] = [];
    user.assigmentList.forEach((assignmentList) => {
      if (assignmentList.assignments) {
        assignments.push(...assignmentList.assignments);
      }
    });

    return assignments;
  }

  async findAssignmentById(assignmentId: string): Promise<AssignmentEntity> {
    const assignment = await this.assignmentsRepository.findOne({
      where: {
        id: assignmentId
      }
    });

    if (!assignment) {
      throw new NotFoundException(
        `assignment not found with Id ${assignmentId}`
      );
    }

    return assignment;
  }

  async updatedConcludeAssignment(
    assignmentId: string
  ): Promise<AssignmentEntity> {
    const assignment = await this.findAssignmentById(assignmentId);

    if (!assignment.concluded) {
      assignment.concluded = true;
      assignment.concludeAt = new Date();
    }

    return this.assignmentsRepository.save(assignment);
  }

  async updatedUnconcludeAssignment(
    assignmentId: string
  ): Promise<AssignmentEntity> {
    const assignment = await this.findAssignmentById(assignmentId);

    if (assignment.concluded) {
      assignment.concluded = false;
      assignment.concludeAt = new Date(0);
    }

    return this.assignmentsRepository.save(assignment);
  }

  async deleteAssignment(assignmentId: string): Promise<DeleteResult> {
    await this.findAssignmentById(assignmentId);

    return this.assignmentsRepository.delete({ id: assignmentId });
  }

  async updateAssignment(
    assignmentId: string,
    assignmentUpdated: UpdatedAssignmentDto
  ): Promise<AssignmentEntity> {
    const assignment = await this.findAssignmentById(assignmentId);

    return this.assignmentsRepository.save({
      ...assignment,
      ...assignmentUpdated
    });
  }
}
