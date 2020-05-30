import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GroupEntity } from './group.entity';
import { RoleEntity } from './role.entity';

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
  
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => GroupEntity, group => group.creator)
  group: GroupEntity[];

  @ManyToOne(type => RoleEntity, role => role.id)
  role: GroupEntity[];

  @BeforeInsert()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);  
  }
}