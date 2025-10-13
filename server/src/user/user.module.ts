import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SeedService } from "./seed.service";
import { Post } from "src/post/entities/post.entity";
import { Comment } from "src/comment/entities/comment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Post, Comment])
    ],
    providers: [UserService, SeedService],
    controllers: [UserController],
    exports: [UserService, SeedService, TypeOrmModule]
})
export class UserModule {}