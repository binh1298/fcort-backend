import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn() 
  createdDate: Date;
  
  @ManyToOne(type => UserEntity, user => user.id)
  user: UserEntity;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}