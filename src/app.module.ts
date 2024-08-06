import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { Store } from './stores/entities/store.entity';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';
import { Product } from './products/entities/product.entity';

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
