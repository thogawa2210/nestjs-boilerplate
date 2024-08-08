import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	address: string;

	@Column({ default: true })
	isActive: boolean;

	@Column({nullable: true})
	district: string;

	@OneToMany(() => Product, (product) => product.store)
	products: Product[];
}
