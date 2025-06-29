import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDTO, UpdateUserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createUser(user: CreateUserDTO) : Promise<User> {
        if (user.password !== user.repeatPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const existingUser = await this.userRepository.findOne({where: {email: user.email}})
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = this.userRepository.create({
            username: user.username,
            email: user.email,
            password: hashedPassword,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            country: user.country,
            city: user.city,
            address: user.address,
            phoneNumber: user.phoneNumber
        });

        return await this.userRepository.save(newUser);
    }

    async deleteUser(id: string) : Promise<void> {
        const user = await this.userRepository.findOneBy({id});
        if (!user){
            throw new NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDTO) : Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if (!user){
            throw new NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async findByEmail(email: string) : Promise<User|null>{
        return await this.userRepository.findOne({where: {email}});
    }

    async comparePasswords(password: string, hashedPassword: string) : Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}