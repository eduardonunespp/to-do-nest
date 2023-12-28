import { AssignmentListEntity } from 'src/assignment-list/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class AssignmentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'dead_line', nullable: false })
  deadLine: string;

  @Column({ name: 'assignment_list_id', nullable: false })
  assignmentListId: string;

  @Column({ name: 'concluded', nullable: true })
  concluded: boolean;

  @Column({ name: 'concludeAt', nullable: true })
  concludeAt: Date;

  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;

  @ManyToOne(
    () => AssignmentListEntity,
    (assignmentListEntity) => assignmentListEntity.assignments
  )
  @JoinColumn({ name: 'assignment_list_id', referencedColumnName: 'id' })
  assignmentList?: AssignmentListEntity[];
}
