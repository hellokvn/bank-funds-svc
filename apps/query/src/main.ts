import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { HttpExceptionFilter } from '@shared/filter/http-exception.filter';
import { AppModule } from './app.module';
import { BANK_FUNDS_QUERY_PACKAGE_NAME } from './common/proto/bank-funds-query.pb';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();

  await configure(app, config);

  await app.listen(undefined, () => {
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[DKR] ${process.env.IS_DOCKER ? true : false}`);
    logger.log(`[KFK] ${config.get('KAFKA_URL')}`);
    logger.log(`[URL] ${config.get('QUERY_GRPC_URL')}`);
  });
}

async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        url: config.get('QUERY_GRPC_URL'),
        package: BANK_FUNDS_QUERY_PACKAGE_NAME,
        protoPath: 'node_modules/bank-shared-proto/proto/bank-funds-query.proto',
      },
    },
    { inheritAppConfig: true },
  );

  app.connectMicroservice(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'bank-funds-client',
          brokers: [config.get('KAFKA_URL')],
        },
        consumer: {
          groupId: 'bank-funds-svc',
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}

bootstrap();
