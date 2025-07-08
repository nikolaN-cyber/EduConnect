import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { PostContent } from "src/post-content/entities/post-content.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => PostContent, content => content.post, {cascade: true, eager: true})
    @JoinColumn()
    content: PostContent;  

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    user: User;
}