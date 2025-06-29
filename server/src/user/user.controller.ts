import { Controller, Body, Post, Patch, Delete, Param, UseGuards } from "@nestjs/common";
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
    async edit(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        this.userService.deleteUser(id);
    }
}