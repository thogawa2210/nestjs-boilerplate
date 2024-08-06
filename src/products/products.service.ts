import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/store.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product) private productRepository: Repository<Product>,
		@InjectRepository(Store)
		private storeRepository: Repository<Store>,
	) {}
	async create(createProductDto: CreateProductDto) {
		const store = await this.storeRepository.findOneBy({
			id: createProductDto.storeId,
		});
		console.log('🚀 ~ ProductsService ~ create ~ store:', store);
		if (!store) {
			throw new Error('Store not found');
		}

		return this.productRepository.save({ name: createProductDto.name, store });
	}

	findAll() {
		return `This action returns all products`;
	}

	findOne(id: number) {
		return `This action returns a #${id} product`;
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		console.log(
			'🚀 ~ ProductsService ~ update ~ updateProductDto:',
			updateProductDto,
		);
		return `This action updates a #${id} product`;
	}

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}
