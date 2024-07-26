import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
	const logger = new Logger(bootstrap.name);
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.use((req: Request, res: Response, next) => {
		logger.debug('===TRIGGER GLOBAL MIDDLEWARE===');
		next();
	});
	await app.listen(3000);
}
bootstrap();
