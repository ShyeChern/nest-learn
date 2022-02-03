import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'admin',
  User = 'user',
}
export const ROLES = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);
