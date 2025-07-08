import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Post } from "src/post/entities/post.entity";

@Entity()
export class PostContent {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    text: string;

    @Column({nullable: true})
    imageUrl: string;

    @Column({nullable: true})
    videoUrl: string;

    @OneToOne(() => Post, post => post.content)
    post: Post;
}