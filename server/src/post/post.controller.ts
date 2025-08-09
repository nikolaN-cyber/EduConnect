import { Controller, Request, Body, Param, UseGuards, Post, Delete, Patch } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { UserPayload } from "src/types/user-payload.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('api/posts')
export class PostController {
    constructor( private readonly postService: PostService ) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
        return this.postService.createPost(createPostDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deletePost(@Param('id') id: string, @Request() req){
        return this.postService.deletePost(id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('edit/:id')
    async editPost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req){
        return this.postService.updatePost(id, updatePostDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('like/:id')
    async likePost(@Param('id') id: string, @Request() req){
        return this.postService.likePost(id, req.user);
    }
}