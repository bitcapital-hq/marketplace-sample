import BaseWrapper from './BaseWrapper';
import ProductStorage from '../models/ProductStorage';


export default class StorageWrapper extends BaseWrapper<ProductStorage>{
    protected static instance: StorageWrapper;

    public wrap(storage: ProductStorage){
        return {
            productName: storage.product.name,
            ownerName: storage.owner.name,
            ownerId: storage.owner.id,
            quantity: storage.quantity,
            price: storage.price,
            deliveryFee: storage.deliveryFee
        };
    }

    public static getInstance() {
        if (!this.instance) {
            return this.initialize();
        }
        return this.instance;
    }
    
    public static initialize() {
        const wrapper = new StorageWrapper();
        if (!this.instance) {
          this.instance = wrapper;
        }
        return wrapper;
    }
}