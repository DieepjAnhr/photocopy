import {
  GraphQLError,
  GraphQLErrorExtensions,
  GraphQLFormattedError,
} from 'graphql';

interface CustomGraphQLErrorExtensions extends GraphQLErrorExtensions {
  exception?: {
    message: string;
    status: number;
  };

  response?: {
    message: string;
    statusCode: number;
  };
}

export const formatError = (error: GraphQLError) => {
  const extensions = error.extensions as CustomGraphQLErrorExtensions;

  const standardError: GraphQLFormattedError = {
    ...error,
    message: String(error.extensions?.message || error.message),
    extensions: {
      __orginal: {
        ...extensions,
      },
      code: error.extensions?.code || 'UNKNOWN ERROR',
      message: error.extensions?.message || error.message,
    },
  };
  // HTTP Exception
  if (standardError?.extensions) {
    if (extensions?.exception) {
      standardError.extensions.message = extensions.exception.message;
      standardError.extensions.status = extensions.exception.status;
    }
    // Class vaildation Exception
    if (extensions?.response) {
      standardError.extensions.message = extensions.response.message;
      standardError.extensions.status = extensions.response.statusCode;
    }
  }
  return standardError;
};
