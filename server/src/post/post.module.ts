import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { UserModule } from "src/user/user.module";
import { PostController } from "./post.controller";
import { Post } from "./entities/post.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([Post]), UserModule],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService, TypeOrmModule]
})
export class PostModule {}