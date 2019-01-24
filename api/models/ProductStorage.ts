import {Column, Entity, ManyToOne} from 'typeorm';
import BaseModel from './BaseModel';
import { BaseModelSchema } from './BaseModel';
import { IsNumber } from 'class-validator';
import Product from './Product';
import User from './User';

export interface ProductStorageSchema extends BaseModelSchema{

}

@Entity(ProductStorage.tableName)
export default class ProductStorage extends BaseModel implements ProductStorageSchema{
    private static readonly tableName = 'storage';
    
    @Column({ nullable: false })
    @IsNumber()
    public price: number = undefined;

    @Column({ nullable: false })
    @IsNumber()
    public deliveryFee: string = undefined;

    @Column({ nullable: false })
    @IsNumber()
    public quantity: string = undefined;

    @ManyToOne(type => User,
    {
        nullable: false
    })
    public owner: User = undefined;

    @ManyToOne(type => Product, {
        nullable: false
    })
    public product: Product = undefined;
    
    public constructor(data: Partial<ProductStorageSchema>) {
        super(data);
    }
}