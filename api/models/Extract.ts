import {Column, Entity, ManyToOne} from 'typeorm';
import BaseModel from './BaseModel';
import { BaseModelSchema } from './BaseModel';
import User from './User';
import ProductStorage from './ProductStorage';

export interface ExtractSchema extends BaseModelSchema{
    totalValue: number,
    quantity: number,
    customer: User,
    seller: User,
    storage: ProductStorage
}

@Entity(Extract.tableName)
export default class Extract extends BaseModel implements ExtractSchema{
    private static readonly tableName = 'extract';

    @Column({ nullable: false })
    public totalValue: number = undefined;

    @Column({ nullable: false })
    public quantity: number = undefined;

    @ManyToOne(type => User, {
        onDelete: "RESTRICT",
        nullable: false
    })
    public customer: User = undefined;

    @ManyToOne(type => User, {
        onDelete: "RESTRICT",
        nullable: false
    })
    public seller: User = undefined;

    @ManyToOne(type => ProductStorage, {
        onDelete: "RESTRICT",
        nullable: false
    })
    public storage: ProductStorage = undefined;

    public constructor(data: Partial<ExtractSchema>) {
        super(data);
    }

    public static async getBuysForUser(userId: string){
        return this.createQueryBuilder("user")
                    .where("customer.id = :id", { id: userId })
                    .getMany();
    }

    public static async getSellsForUser(userId: string){
        return this.createQueryBuilder("user")
        .where("seller.id = :id", { id: userId })
        .getMany();
    }
}