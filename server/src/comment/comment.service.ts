import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Post } from "src/post/entities/post.entity";
import { CreateCommentDto, GetCommentsDto, UpdateCommentDto } from "./dto/coment.dto";
import { UserPayload } from "src/types/user-payload.interface";
import { UserRole } from "src/types/enums";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createComment(comment: CreateCommentDto, userPayload: UserPayload): Promise<Comment> {
        const user = await this.userRepository.findOne({ where: { id: userPayload.sub } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.postRepository.findOne({ where: { id: comment.postId } });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const newComment = new Comment();
        newComment.text = comment.text;
        newComment.author = user;
        newComment.post = post;
        return await this.commentRepository.save(newComment);
    }

    async deleteComment(id: string, userPayload: UserPayload): Promise<void> {
        const comment = await this.commentRepository.findOne({ 
            where: { id },
            relations: ['author']
        });
        if (!comment) {
            throw new NotFoundException('Comment not found!');
        }
        if (comment.author.id !== userPayload.sub && userPayload.role !== UserRole.ADMIN){
            throw new ForbiddenException("You are not allowed to delete this comment!");
        }
        await this.commentRepository.remove(comment);
    }

    async editComment(commentId: string, editComment: UpdateCommentDto, userPayload: UserPayload): Promise<Comment> {
        const comment = await this.commentRepository.findOne({ 
            where: { id: commentId },
            relations: ['author'] 
        });
        if (!comment) {
            throw new NotFoundException('Comment not found!');
        }
        if (comment.author.id !== userPayload.sub && userPayload.role !== UserRole.ADMIN){
            throw new ForbiddenException('You are not allowed to edit this comment!');
        }
        Object.assign(comment, editComment);
        return this.commentRepository.save(comment);
    }

    async getCommentsForPost(getCommentsDto: GetCommentsDto): Promise<Comment[]> {
        const { postId, limit, offset } = getCommentsDto;
        return this.commentRepository.find({
            where: { post: { id: postId } },
            order: { createdAt: 'ASC' },
            skip: offset,
            take: limit,
            relations: ['author'],
        });
    }
}