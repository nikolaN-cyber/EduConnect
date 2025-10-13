import { Post } from "./entities/post.entity";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UserPayload } from "src/types/user-payload.interface";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createPost(createPostDto: CreatePostDto, userPayload: UserPayload): Promise<Post> {
        const user = await this.userRepository.findOne({ where: { id: userPayload.sub } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const newPost = new Post()
        newPost.title = createPostDto.title;
        newPost.user = user;
        newPost.content = createPostDto.content;
        return await this.postRepository.save(newPost);
    }

    async deletePost(id: string, userPayload: UserPayload): Promise<void> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['user'],
        })
        if (!post) {
            throw new NotFoundException("Post not found!");
        }
        if (post.user.id !== userPayload.sub) {
            throw new ForbiddenException('You are not allowed to delete this post!')
        }
        await this.postRepository.remove(post);
    }

    async updatePost(id: string, updatePostDto: UpdatePostDto, userPayload: UserPayload): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['user']
        });
        if (!post) {
            throw new NotFoundException("Post not found!");
        }
        if (post.user.id !== userPayload.sub) {
            throw new ForbiddenException('You are not allowed to update this post!')
        }
        post.title = updatePostDto.title;
        if (updatePostDto.content) {
            post.content.text = updatePostDto.content.text;
            post.content.imageUrl = updatePostDto.content.imageUrl;
        }
        return await this.postRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find({ relations: ['comments', 'user'] });
    }

    async likePost(postId: string, userPayload: UserPayload): Promise<Post> {
        const user = await this.userRepository.findOne({
            where: { id: userPayload.sub },
            relations: ['likedPosts']
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const isLiked = user.likedPosts.some(p => p.id === postId);

        if (!isLiked) {
            post.likes += 1;
            user.likedPosts.push(post);
        } else {
            post.likes -= 1;
            user.likedPosts = user.likedPosts.filter(p => p.id !== postId);
        }
        await this.userRepository.save(user);
        await this.postRepository.save(post);
        return this.postRepository.findOne({
            where: { id: postId },
            relations: ['user', 'comments', 'usersLiked'], 
        });
    }

}