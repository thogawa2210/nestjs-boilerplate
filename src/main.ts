import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const logger = new Logger(bootstrap.name);
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.use((req: Request, res: Response, next) => {
		logger.debug('===TRIGGER GLOBAL MIDDLEWARE===');
		next();
	});

	const config = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('cats')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	SwaggerModule.setup('swagger', app, document, {
		jsonDocumentUrl: 'swagger/json',
	  });
	await app.listen(3000);
}
bootstrap();
