import { Controller, Body, Post, Patch, Delete, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO, UpdateUserDTO } from "./dto/user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() user: CreateUserDTO) {
        return this.userService.createUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('edit/:id')
    async edit(@Body() updateUserDto: UpdateUserDTO, @Request() req) {
        return this.userService.updateUser(updateUserDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(@Request() req) {
        this.userService.deleteUser(req.user);
    }
}