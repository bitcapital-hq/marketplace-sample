import { ServiceOptions, Service, BaseError } from 'ts-framework-common';
import Product from '../models/Product';
import User from '../models/User';
import ProductStorage from '../models/ProductStorage';
import AssetService from './AssetService';

export interface ProductServiceOptions extends ServiceOptions{

}

export default class ProductService extends Service {
    protected static instance: ProductService;

    public async buyProduct(buyerId:string, sellerId:string, productName:string, quantity:number){
        const buyer: User =  await User.findById(buyerId);
        const seller: User =  await User.findById(sellerId);
        const product: Product = await Product.findByName(productName);
        const productStorage: ProductStorage = await ProductStorage.findProductStorageForUserAndProduct(seller, product);
        const assetService: AssetService = AssetService.getInstance({});

        //não gostei disso mas é a vida
        if(productStorage == null || productStorage.quantity < quantity){
            throw new BaseError('Storage limit exceeded or storage doesnt exist.', { ProductStorage: productStorage,
                                                            quantity: quantity });
        }
        
        const totalPrice = productStorage.price * quantity;

        //tira a grana do comprador
        await assetService.debitAssetFromUser(buyer, totalPrice);

        //tira o produto do storage do vendedor
        await this.removeProductFromUserStorage(product, seller, quantity);

        //dá a grana pro vendedor
        await assetService.creditAssetForUser(seller, totalPrice);

        //da o produto pro comprador
        return await this.addProductToUserStorage(product, buyer, quantity, productStorage.price, productStorage.deliveryFee)
    }

    public async listAvailableProducts(){
        return ProductStorage.listAllStorages();
    }

    public async createProduct(name: string, description:string, imageUrl:string){
        return Product.create({
            name: name,
            description: description,
            imageUrl: imageUrl
        });
    }

    public async addProductToUserStorage 
    (product: Product, user: User, quantity:number, price?: number, deliveryFee?: number){
        const storage = await ProductStorage.findProductStorageForUserAndProduct(user, product);

        if(storage == null){
            //create new storage
            return ProductStorage.create({
                price: price,
                deliveryFee: deliveryFee,
                quantity: quantity,
                owner: user,
                product: product
            });
        } else {
            //add to existing storage
            storage.quantity += quantity;
            storage.price = price;
            storage.deliveryFee = deliveryFee;

            return ProductStorage.save(storage[0]);
        }
    }

    public async removeProductFromUserStorage(product: Product, user: User, quantity:number){
        const storage = await ProductStorage.findProductStorageForUserAndProduct(user, product);

        if(storage == null){
            throw new Error('Could not remove product from storage because the storage doesnt exist. ')
        } else {
            if(storage.quantity < quantity) {
                throw new Error('Could not removed product from storage because the storage limit was exceded')
            } else {
                storage.quantity -= quantity;
                return ProductStorage.save(storage);
            }
        }
    }

    constructor(options: ProductServiceOptions) {
        super(options);
    }
    
    public static getInstance(options: ProductServiceOptions) {
        if (!this.instance) {
          throw new Error("Product service is invalid or hasn't been initialized yet");
        }
        return this.instance;
    }
    
    public static initialize(options: ProductServiceOptions) {
        const service = new ProductService(options);
        if(!this.instance) {
          this.instance = service;
        }
        return service;
    }

    async onMount(): Promise<void> {
        this.logger.debug('Mounting ProductService instance');
    }
    
    async onInit(): Promise<void> {
        this.logger.debug('Initializing ProductService instance');
    }
    
    async onReady(): Promise<void> {
        this.logger.info('ProductService initialized successfully');
    }
    
    async onUnmount(): Promise<void> {
        this.logger.debug('Unmounting ProductService instance');
    }
}