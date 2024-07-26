import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
	imports: [
		CacheModule.register({
			ttl: 60 * 1000, // seconds (1 minute)
			max: 100, // maximum number of items in cache
		}),
	],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
