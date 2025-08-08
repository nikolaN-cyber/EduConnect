import { Controller, Body, Request, Param, Post, UseGuards, Query, Get } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateCommentDto, GetCommentsDto } from "./dto/coment.dto";
import { UserPayload } from "src/types/user-payload.interface";

@Controller('api/comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createComment(@Body() comment: CreateCommentDto, @Request() req){
        const userPayload: UserPayload = req.user;
        return this.commentService.createComment(comment, userPayload);
    }

    @UseGuards(JwtAuthGuard)
    @Get('load-next-10')
    async loadNext10Comments(@Query() query: GetCommentsDto){
        return this.commentService.getCommentsForPost(query)
    }
}