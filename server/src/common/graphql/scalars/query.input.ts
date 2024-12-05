import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { IQueryFieldInput } from '../type';

@Scalar('QueryFieldScalar')
export class QueryFieldScalar<T = string>
  implements CustomScalar<string | Record<string, any>, IQueryFieldInput<T>>
{
  description =
    'Generic scalar that accepts either a base type or an object with { in, ne, gte, lte } fields';

  parseValue(value: any): IQueryFieldInput<T> {
    // Called when the value comes from variables (client input)
    if (this.isBaseType(value)) {
      return value;
    }
    if (typeof value === 'object' && value !== null) {
      const allowedKeys = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin'];
      const isValidObject = Object.keys(value).every((key) =>
        allowedKeys.includes(key),
      );
      if (isValidObject) {
        return value;
      }
      throw new Error('Invalid object structure for QueryFieldScalar.');
    }
    throw new Error(
      'QueryFieldScalar accepts only base type or valid object structure.',
    );
  }

  serialize(value: IQueryFieldInput<T>): string | Record<string, any> {
    // Called when returning data to the client
    return value as any;
  }

  parseLiteral(ast: any): IQueryFieldInput<T> {
    // Called when the value comes from inline query arguments
    if (this.isAstBaseType(ast)) {
      return this.convertAstToBaseType(ast);
    }
    if (ast.kind === Kind.OBJECT) {
      const value: Record<string, any> = {};
      ast.fields.forEach((field: any) => {
        value[field.name.value] = this.convertAstToBaseType(field.value);
      });
      return value as IQueryFieldInput<T>;
    }
    throw new Error(
      'QueryFieldScalar accepts only base type or valid object structure.',
    );
  }

  private isBaseType(value: any): value is T {
    // Extend this method to check for the base type (e.g., number, boolean, etc.)
    return typeof value === 'string';
  }

  private isAstBaseType(ast: any): boolean {
    // Extend this method to check if the AST node matches the base type
    return ast.kind === Kind.STRING;
  }

  private convertAstToBaseType(ast: any): T {
    // Convert the AST node to the desired base type
    if (ast.kind === Kind.STRING) {
      return ast.value as T;
    }
    throw new Error('Invalid base type in AST.');
  }
}
