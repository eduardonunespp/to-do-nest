import { AssignmentEntity } from 'src/assignments/entity';
import { UserEntity } from 'src/user/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class AssignmentListEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.assigmentList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @OneToMany(
    () => AssignmentEntity,
    (assignmentEntity) => assignmentEntity.assignmentList,
    { onDelete: 'CASCADE' }
  )
  assignments?: AssignmentEntity[];
}
