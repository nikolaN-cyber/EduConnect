import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = { email: user.email, sub: user.id, role: user.role }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}