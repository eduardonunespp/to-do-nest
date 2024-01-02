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
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class AssignmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'dead_line', nullable: false })
  deadLine: Date;

  @Column({ name: 'assignment_list_id', nullable: false })
  assignmentListId: string;

  @Column({ name: 'concluded', nullable: true, default: false })
  concluded: boolean;

  @Column({
    name: 'conclude_at',
    nullable: true,
    default: new Date(0)
  })
  concludeAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @ManyToOne(
    () => AssignmentListEntity,
    (assignmentListEntity) => assignmentListEntity.assignments,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'assignment_list_id', referencedColumnName: 'id' })
  assignmentList?: AssignmentListEntity;
}
