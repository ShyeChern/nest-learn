import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get controller level roles and replaced by method level
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if no specify role
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // compare role
    const user = request.user?.role;
    // return roles.some((role) => user.roles.includes(role));
    return true;
  }
}
