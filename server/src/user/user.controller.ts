import { Controller, Body, Post, Patch, Delete, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO, UpdateUserDTO } from "./dto/user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { UserRole } from "src/types/enums";
import { Roles } from "src/auth/roles.decorator";

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
        return this.userService.updateProfile(updateUserDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(@Request() req) {
        this.userService.deleteAccount(req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete('delete-by-admin/:id')
    async deleteByAdmin(@Param() id: string){
        this.userService.deleteUserByAdmin(id);
    }
}