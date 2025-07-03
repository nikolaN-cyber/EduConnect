import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/types/enums';
import { ROLES_KEY } from 'src/types/consts';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
