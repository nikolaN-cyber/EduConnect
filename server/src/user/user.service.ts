import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDTO, UpdateUserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRole } from "src/types/enums";
import { UserPayload } from "src/types/user-payload.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createUser(user: CreateUserDTO): Promise<User> {
        if (user.password !== user.repeatPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const existingUser = await this.userRepository.findOne({ where: { email: user.email } })
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
            phoneNumber: user.phoneNumber,
            likedPosts: []
        });

        return await this.userRepository.save(newUser);
    }

    async deleteUser(userPayload: UserPayload): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userPayload.sub }});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }

    async updateUser(updateUserDto: UpdateUserDTO, userPayload: UserPayload): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userPayload.sub }});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async findById(id: string): Promise<User|null> {
        return await this.userRepository.findOne({where: {id}});
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async createAdminIfNotExists(): Promise<void> {
        const admin = await this.userRepository.findOne({ where: { role: UserRole.ADMIN } });

        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            const newAdmin = this.userRepository.create({
                username: 'admin',
                email: 'admin@example.com',
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                dateOfBirth: new Date('1990-01-01'),
                country: 'Srbija',
                city: 'Beograd',
                address: 'Adresa Admina 1',
                phoneNumber: '+381600000000',
                role: UserRole.ADMIN,
            });
            await this.userRepository.save(newAdmin);
        }
    }
}