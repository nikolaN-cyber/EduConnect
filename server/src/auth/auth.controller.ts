import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Controller, Post, UseGuards, Request } from "@nestjs/common";

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }
}