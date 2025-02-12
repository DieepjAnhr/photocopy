import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import { HandleRequestInterceptor } from './common/interceptors/logging.interceptor';
import { AppLogger } from './common/logger/logger.service';

async function bootstrap() {
  const PORT = process.env.PORT ?? 5000;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(AppLogger);
  logger.log('Application is starting...', 'Bootstrap');
  app.useLogger(logger);
  app.useGlobalInterceptors(new HandleRequestInterceptor(logger));
  app.useGlobalFilters(new AppExceptionFilter(logger));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    logger.log(`Application started at: localhost:${PORT}`, 'Bootstrap');
  });
}
bootstrap();
