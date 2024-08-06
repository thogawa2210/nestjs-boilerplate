import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/store.entity';

@Module({
	imports: [
		CacheModule.register({
			ttl: 60 * 1000, // seconds (1 minute)
			max: 100, // maximum number of items in cache
		}),
		TypeOrmModule.forFeature([Product, Store]),
	],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
