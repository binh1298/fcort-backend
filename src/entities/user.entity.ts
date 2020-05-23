import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GroupEntity } from './group.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn() 
  createdDate: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  fullname: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  avatar: string;

  @OneToMany(type => GroupEntity, group => group.user)
  group: GroupEntity[];

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);  
  }
}