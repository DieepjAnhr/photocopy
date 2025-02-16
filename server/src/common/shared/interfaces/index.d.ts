import { MetadataResponse } from 'src/common/graphql/metadata.response';
import { IDataloader } from './dataloader.interface';

declare global {
  interface IGraphQLContext {
    loaders: IDataloader;
  }

  interface IPaginationResponse<T> {
    metadata?: MetadataResponse;
    data?: T[];
  }
}
