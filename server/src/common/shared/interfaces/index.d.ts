import { IDataloader } from './dataloader.interface';

declare global {
  interface IGraphQLContext {
    loaders: IDataloader;
  }

  interface IPaginationResponse<T> {
    count: number;
    data: T[];
  }
}
