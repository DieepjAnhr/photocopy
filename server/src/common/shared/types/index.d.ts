import { IDataloader } from '../dataloader/dataloader.interface';

declare global {
  interface IGraphQLContext {
    loaders: IDataloader;
  }
}
