import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
	constructor(
		@InjectRepository(Store)
		private storesRepository: Repository<Store>,
	) {}
	async create(createStoreDto: CreateStoreDto) {
		const store = await this.storesRepository.save(createStoreDto);
		return store;
	}

	findAll() {
		return this.storesRepository.find();
	}

	findOne(id: number) {
		return this.storesRepository.findOneBy({ id });
	}

	async update(id: number, updateStoreDto: UpdateStoreDto) {
		const updatedStore = await this.storesRepository.update(id, updateStoreDto);
		return updatedStore;
	}

	async remove(id: number) {
		await this.storesRepository.delete(id);
	}

	async test() {
		for (let i = 1; i < 301; i++) {
			await this.create({
				name: `Store ${i}`,
				address: `Street ${i}, Hanoi, Vietnam`,
			});
		}
		return true;
	}

	async findStoreWithProducts(storeId: number): Promise<Store> {
		return this.storesRepository.findOne({
		  where: { id: storeId },
		  relations: ['products'],
		});
	  }
}
