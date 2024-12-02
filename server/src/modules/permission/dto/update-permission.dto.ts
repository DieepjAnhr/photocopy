import { InputType, Field, ID, PartialType, Int } from '@nestjs/graphql';
import { CreatePermissionInput } from './create-permission.dto';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => Int)
  id: number;
}
