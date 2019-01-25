import {Column, Entity} from 'typeorm';
import BaseModel from './BaseModel';
import { BaseModelSchema } from './BaseModel';

export interface ProductSchema extends BaseModelSchema {
    name:string;
    description: string;
    imageUrl: string;
}

@Entity(Product.tableName)
export default class Product extends BaseModel implements ProductSchema {
    private static readonly tableName = 'product';

    @Column({ nullable: false })
    public name: string = undefined;

    @Column({ nullable: false })
    public description: string = undefined;

    @Column({ nullable: false })
    public imageUrl: string = undefined;

    public constructor(data: Partial<ProductSchema>) {
        super(data);
    }

    public static async findByName(name: string): Promise<Product | undefined> {
        return this.findOne({ where: {name} });
    }
}

