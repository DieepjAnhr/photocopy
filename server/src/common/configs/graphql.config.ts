import { ApolloDriverConfig } from '@nestjs/apollo';
import { JSONResolver } from 'graphql-scalars';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { ConfigService } from '@nestjs/config';
import { ERROR_CODES } from '../exceptions/constant.exception';
import { DataloaderService } from '../dataloader/dataloader.service';

export const graphqlConfig = async (
  dataloaderService: DataloaderService,
  configService: ConfigService,
): Promise<ApolloDriverConfig> => ({
  resolvers: { JSON: JSONResolver },
  playground: configService.get<boolean>('GRAPHQL_PLAYGROUND', false),
  sortSchema: true,
  autoSchemaFile: join(process.cwd(), `src/schema.gql`),
  context: () => ({
    loaders: dataloaderService.createLoaders(),
  }),
  formatError: (error: GraphQLError) => {
    const extensions = error?.extensions;
    return {
      status: extensions?.code || ERROR_CODES.UNKNOWN_ERROR,
      message: error.message,
      path: error.path || null,
      extensions: {
        code: extensions?.code,
      },
    };
  },
});
