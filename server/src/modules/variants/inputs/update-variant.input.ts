import { InputType, PartialType } from '@nestjs/graphql';
import { CreateVariantInput } from './create-variant.input';

@InputType()
export class UpdateVariantInput extends PartialType(CreateVariantInput) {}
