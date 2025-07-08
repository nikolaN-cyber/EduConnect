import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "./user.service";

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name)

    constructor(private readonly userService: UserService) {}

    async seedAdminUser() {
        try {
            await this.userService.createAdminIfNotExists();
            this.logger.log('Seed admin user created successfully or already exists.');
        } catch (error) {
            this.logger.error('Error occurred while creating admin user', error);
        }
    }

}