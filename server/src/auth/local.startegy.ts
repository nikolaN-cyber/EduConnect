import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService){
        super({usernameField: 'email'})
    }

    async validate(email: string, password: string) : Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user){
            throw new UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await this.userService.comparePasswords(password, user.password);
        if (!isPasswordValid){
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }
}