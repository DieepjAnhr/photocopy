import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { GraphqlPassportAuthGuard } from '../guards/passport-auth.guard';

export const GUARD_ROLE = Symbol('GUARD_ROLE');

export const UseAuthGuard = (permissions?: string | string[]) =>
  applyDecorators(
    SetMetadata(
      GUARD_ROLE,
      permissions
        ? Array.isArray(permissions)
          ? permissions
          : [permissions]
        : ['FULL_PERMISSION'],
    ),
    UseGuards(GraphqlPassportAuthGuard),
  );
