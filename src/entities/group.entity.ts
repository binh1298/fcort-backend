import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn() 
  createdDate: Date;
  
  @Column('text', { nullable: false })
  creatorId: string;

  @ManyToOne(type => UserEntity, creator => creator.id)
  @JoinColumn({ name: "creatorId" })
  creator: UserEntity;
    
  @ManyToMany(type => UserEntity)
  @JoinTable()
  members: UserEntity[];

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}