import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Comment } from "src/comment/entities/comment.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'int', default: 0 })
    likes: number;

    @Column({ type: 'jsonb', nullable: true })
    content: {
        text?: string;
        imageUrl?: string;
    };

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @ManyToMany(() => User, user => user.likedPosts)
    usersLiked: User[];

    @ManyToOne(() => User, user => user.posts, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;
}