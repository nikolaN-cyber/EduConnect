import { Controller, Body, Request, Param, Post, UseGuards, Query, Get, Patch, Delete } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateCommentDto, GetCommentsDto, UpdateCommentDto } from "./dto/coment.dto";
import { UserPayload } from "src/types/user-payload.interface";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('api/comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createComment(@Body() comment: CreateCommentDto, @Request() req){
        return this.commentService.createComment(comment, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('edit/:id')
    async editComment(@Param('id') id:string, @Body() editComment: UpdateCommentDto, @Request() req) {
        return this.commentService.editComment(id, editComment, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteComment(@Param('id') id:string, @Request() req) {
        return this.commentService.deleteComment(id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('load-comments-for-post/:postId')
    async getCommentsByPost(@Param('postId') postId: string){
        return this.commentService.getCommentsForPost(postId)
    }
}