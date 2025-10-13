import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'Nikola',
      password: 'Nikola24@',
      database: 'EduConnect',
      synchronize: true,
      entities: [User, Post, Comment]
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    MulterModule.register({ storage: memoryStorage })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
