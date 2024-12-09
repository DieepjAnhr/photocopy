import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { GraphqlPassportAuthGuard } from '../guards/graphql-passport-auth.guard';

export const UseAuthGuard = (permissions?: string | string[]) => {
  return applyDecorators(
    SetMetadata(
      'permissions',
      permissions
        ? Array.isArray(permissions)
          ? permissions
          : [permissions]
        : ['none'],
    ),
    UseGuards(GraphqlPassportAuthGuard),
  );
};
