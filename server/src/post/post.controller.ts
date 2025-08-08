import { Controller, Request, Body, Param, UseGuards, Post, Delete, Patch } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { UserPayload } from "src/types/user-payload.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('api/posts')
export class PostController {
    constructor( private readonly postService: PostService ) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
        const userPayload: UserPayload = req.user;
        return this.postService.createPost(createPostDto, userPayload);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deletePost(@Param('id') id: string, @Request() req){
        const userPayload: UserPayload = req.user;
        return this.postService.deletePost(id, userPayload);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('edit/:id')
    async editPost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req){
        const userPayload: UserPayload = req.user;
        return this.postService.updatePost(id, updatePostDto, userPayload);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('like/:id')
    async likePost(@Param('id') id: string, @Request() req){
        const userPayload: UserPayload = req.user;
        return this.postService.likePost(id, userPayload);
    }
}