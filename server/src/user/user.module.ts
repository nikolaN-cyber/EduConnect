import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SeedService } from "./seed.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UserService, SeedService],
    controllers: [UserController],
    exports: [UserService, SeedService, TypeOrmModule]
})
export class UserModule {}