import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
	constructor(private readonly storesService: StoresService) {}

	@Post()
	create(@Body() createStoreDto: CreateStoreDto) {
		return this.storesService.create(createStoreDto);
	}

	@Get()
	findAll() {
		return this.storesService.findAll();
	}

	@Get('test')
	test() {
		return this.storesService.test();
	}

	@Get(':id/withProducts')
	findStoreWithProducts(@Param('id') id: string) {
		return this.storesService.findStoreWithProducts(+id);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.storesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
		return this.storesService.update(+id, updateStoreDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.storesService.remove(+id);
	}
}
