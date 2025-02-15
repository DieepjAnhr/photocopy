import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FileUpload, GetFileUploadType } from './entities/file-upload.entity';
import { AbstractResolver } from 'src/common/abstracts/resolver.abstract';
import { FileUploadService } from './file-upload.service';
import { AppLogger } from 'src/common/logger/logger.service';
import { User } from '../users/entities/user.entity';
import { UseAuthGuard } from 'src/common/decorators/auth-guard.decorator';
import { GetManyInput, GetOneInput } from 'src/common/graphql/query.input';
import { CreateFileUploadInput } from './inputs/create-file-upload.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { PERMISSIONS } from 'src/common/shared/constant/permission.constant';
import { UpdateFileUploadInput } from './inputs/update-file-upload.input';

@Resolver(() => FileUpload)
export class FileUploadResolver extends AbstractResolver<FileUploadService> {
  constructor(
    private readonly fileUploadService: FileUploadService,
    appLogger: AppLogger,
  ) {
    super(fileUploadService, appLogger);
  }

  @Query(() => FileUpload, { nullable: true })
  @UseAuthGuard([PERMISSIONS.VIEW_FILE])
  async file(
    @Args({ name: 'query', nullable: true }) condition: GetOneInput<FileUpload>,
  ) {
    return await this.fileUploadService.getOne(condition);
  }

  @Query(() => GetFileUploadType)
  @UseAuthGuard([PERMISSIONS.VIEW_FILE])
  async files(
    @Args({ name: 'query', nullable: true })
    query: GetManyInput<FileUpload>,
  ) {
    return await this.fileUploadService.getMany(query);
  }

  @Mutation(() => FileUpload)
  @UseAuthGuard([PERMISSIONS.CREATE_FILE])
  async createFile(
    @Args('data') data: CreateFileUploadInput,
    @CurrentUser() user: User,
  ) {
    return await this.fileUploadService.create(data, user);
  }

  @Mutation(() => FileUpload)
  @UseAuthGuard([PERMISSIONS.UPDATE_FILE])
  async updateFile(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateFileUploadInput,
    @CurrentUser() user: User,
  ) {
    return await this.fileUploadService.update(id, data, user);
  }

  @Mutation(() => Boolean)
  @UseAuthGuard([PERMISSIONS.DELETE_FILE])
  async deleteFile(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.fileUploadService.delete(id, user);
  }

  @ResolveField(() => User, { nullable: true })
  async owner(
    @Parent() file: FileUpload,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([file.owner_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async creator(
    @Parent() file: FileUpload,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([file.created_by]);
    return users[0];
  }

  @ResolveField(() => User, { nullable: true })
  async updater(
    @Parent() file: FileUpload,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const users = await loaders.usersLoader.load([file.updated_by]);
    return users[0];
  }
}
