import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/types/consts';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
