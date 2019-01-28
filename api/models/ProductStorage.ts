import {Column, Entity, ManyToOne} from 'typeorm';
import BaseModel from './BaseModel';
import { BaseModelSchema } from './BaseModel';
import { IsNumber } from 'class-validator';
import Product from './Product';
import User from './User';

export interface ProductStorageSchema extends BaseModelSchema{
    price: number,
    deliveryFee: number,
    quantity: number,
    owner: User,
    product: Product
}

@Entity(ProductStorage.tableName)
export default class ProductStorage extends BaseModel implements ProductStorageSchema{
    private static readonly tableName = 'storage';
    
    @Column({ nullable: false })
    @IsNumber()
    public price: number = undefined;

    @Column({ nullable: false })
    public deliveryFee: number = undefined;

    @Column({ nullable: false })
    public quantity: number = undefined;

    @ManyToOne(type => User,{
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

    public static async findProductStorageForUserAndProduct(user: User, product:Product){
        return this.findOne({
            where:{
                owner: user,
                product: product
            }
        });
    }

    public static async listAllStorages(){
        return this.find();
    }
}