import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphqlPassportAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const { permissions = ['full_access'] } = req.user;

    if (Array.isArray(permissions) && permissions.includes('full_access')) {
      return true;
    }

    return this.hasAccess(permissions, requiredPermissions);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }

  private hasAccess(
    permissions: string,
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions
      .map((elm: string) => permissions.includes(elm))
      .some((elm: boolean) => elm);
  }
}
