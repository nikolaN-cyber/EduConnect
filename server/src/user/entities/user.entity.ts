import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { UserRole } from 'src/types/enums';

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
}
