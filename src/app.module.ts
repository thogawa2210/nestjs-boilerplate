import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomThrottlerGuard } from './guards/throttler.guard';
import { VersionMiddleware } from './middlewares/version.middlewares';
import { OrdersModule } from './orders/orders.module';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { Store } from './stores/entities/store.entity';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		UsersModule,
		ProductsModule,
		OrdersModule,
		StoresModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'thogia123',
			database: 'nest-boilerplate',
			entities: [Store, Product],
			synchronize: true,
			autoLoadEntities: true,
		}),
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
