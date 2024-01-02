import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAssignmentList1704208750384
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE IF NOT EXISTS assignment_list_entity (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR NOT NULL,
          user_id UUID NOT NULL,
          createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          
          CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user_entity(id) ON DELETE CASCADE
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DROP TABLE IF EXISTS assignment_list_entity;
    `);
  }
}
