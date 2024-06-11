import { UserResponse } from '../user-responses/user-responses.entity';
import { Base } from '../common/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserRoleType {
  CANDIDATE = 'candidate',
  REVIEWER = 'reviewer',
}

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleType,
  })
  role: UserRoleType;

  @OneToMany(() => UserResponse, (response) => response.candidate)
  responses: UserResponse[];
}
