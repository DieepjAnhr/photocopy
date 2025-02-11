import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePermissionInput } from './create-permission.dto';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {}
