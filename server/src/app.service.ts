import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SeedService } from './user/seed.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  constructor(private readonly seedService: SeedService) {}

  async onApplicationBootstrap() {
     await this.seedService.seedAdminUser();
  }
  
}
