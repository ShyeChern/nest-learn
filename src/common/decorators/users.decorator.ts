import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// @Get()
// async findOne(@User() user: UserEntity) {
//   console.log(user);
// }

// more nested decorator
// import { applyDecorators } from '@nestjs/common';

// export function Auth(...roles: Role[]) {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(AuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//   );
// }
