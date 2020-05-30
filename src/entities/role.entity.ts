import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('role') 
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @OneToMany(type => UserEntity, user => user.id)
  user: UserEntity[];
}