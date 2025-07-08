import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from 'src/types/enums';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; 

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({type: 'enum', enum: UserRole, default: UserRole.USER,})
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Post, post => post.user, {cascade: true})
  posts: Post[];
}
