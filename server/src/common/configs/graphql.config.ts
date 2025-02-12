import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { JSONResolver } from 'graphql-scalars';
import { join } from 'path';
import { DataloaderModule } from '../dataloader/dataloader.module';
import { DataloaderService } from '../dataloader/dataloader.service';

export const GraphQLConfig = GraphQLModule.forRootAsync<ApolloDriverConfig>({
  driver: ApolloDriver,
  imports: [DataloaderModule],
  inject: [DataloaderService],
  useFactory: async (dataloaderService: DataloaderService) => ({
    resolvers: { JSON: JSONResolver },
    playground: false,
    sortSchema: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    context: () => ({
      loaders: dataloaderService.createLoaders(),
    }),
  }),
});
