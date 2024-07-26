import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomThrottlerGuard } from './guards/throttler.guard';
import { VersionMiddleware } from './middlewares/version.middlewares';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		UsersModule,
		ProductsModule,
		OrdersModule,
		ThrottlerModule.forRoot([
			{
				name: 'short',
				ttl: 5000,
				limit: 3,
			},
		]),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: CustomThrottlerGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(VersionMiddleware).forRoutes('products');
	}
}
