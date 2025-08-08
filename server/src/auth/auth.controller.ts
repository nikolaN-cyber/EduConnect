import { ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { LoginDto } from "src/user/dto/user.dto";

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}