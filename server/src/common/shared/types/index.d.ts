import { IDataloader } from '../interfaces/dataloader.interface';

declare global {
  interface IGraphQLContext {
    loaders: IDataloader;
  }
}
