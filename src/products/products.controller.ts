import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { JwtAuthorizationGuard } from 'src/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude-null.interceptor';
import { JwtCacheInterceptor } from 'src/interceptors/jwt-cache.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseInterceptors(TimeoutInterceptor)
@UseGuards(JwtAuthorizationGuard)
@Controller('products')
export class ProductsController {
	private logger: Logger;
	constructor(private readonly productsService: ProductsService) {
		this.logger = new Logger(ProductsController.name);
	}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto);
	}

	@Get('test')
	test() {
		return true;
	}

	@UseInterceptors(JwtCacheInterceptor)
	@UseInterceptors(ExcludeNullInterceptor)
	@UseGuards(OwnershipGuard)
	@Get()
	findAll() {
		this.logger.log(`Method name: ${this.findAll.name}`);
		return this.productsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(+id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productsService.remove(+id);
	}
}
