import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { UserModule } from "src/user/user.module";
import { PostModule } from "src/post/post.module";
import { CommentService } from "./comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), UserModule, PostModule],
    providers: [CommentService],
    controllers: [CommentController],
    exports: [CommentService, TypeOrmModule]
})
export class CommentModule {}