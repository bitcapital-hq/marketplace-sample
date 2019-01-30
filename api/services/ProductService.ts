import { ServiceOptions, Service, BaseError } from "ts-framework-common";
import Product from "../models/Product";
import User from "../models/User";
import ProductStorage from "../models/ProductStorage";
import AssetService from "./AssetService";
import { Transaction, TransactionManager, EntityManager } from "typeorm";
import { Extract } from "../models";
import { ExtractService } from ".";

export interface ProductServiceOptions extends ServiceOptions {}

export default class ProductService extends Service {
  protected static instance: ProductService;

  public async buyProduct(buyerId: string, sellerId: string, productName: string, quantity: number) {
    const buyer: User = await User.findById(buyerId);
    const seller: User = await User.findById(sellerId);
    const product: Product = await Product.findByName(productName);
    const sellerStorage: ProductStorage = await ProductStorage.findProductStorageForUserAndProduct(seller, product);
    const assetService: AssetService = AssetService.getInstance();

    if (quantity <= 0) {
      throw new BaseError("Product quantity is invalid.", { quantity });
    }

    // não gostei disso mas é a vida
    if (sellerStorage == null || sellerStorage.quantity < quantity) {
      throw new BaseError("Storage limit exceeded or storage doesnt exist.", {
        ProductStorage: sellerStorage,
        quantity
      });
    }

    const totalPrice = sellerStorage.price * quantity + sellerStorage.deliveryFee;

    // tira a grana do comprador
    await assetService.debitAssetFromUser(buyer, totalPrice);

    // tira o produto do storage do vendedor
    await this.removeProductFromUserStorage(product, seller, quantity);

    // dá a grana pro vendedor
    await assetService.creditAssetForUser(seller, totalPrice);

    // da o produto pro comprador
    await this.addProductToUserStorage(product, buyer, quantity, sellerStorage.price, sellerStorage.deliveryFee);

    // add transaction to the extract
    return ExtractService.getInstance().createExtract(totalPrice, quantity, buyer, seller, sellerStorage);
  }

  public async listAvailableProducts() {
    return ProductStorage.listAllStorages();
  }

  public async createProduct(name: string, description: string, imageUrl: string) {
    const product: Product = await Product.create({
      name,
      description,
      imageUrl
    });

    product.validate();
    return product.save();
  }

  public async addProductToUserStorage(
    product: Product,
    user: User,
    quantity: number,
    price?: number,
    deliveryFee?: number
  ) {
    if (price <= 0 || deliveryFee <= 0) {
      throw new BaseError("Price or delivery fee are invalid.", {
        price,
        quantity
      });
    }

    const storage = await ProductStorage.findProductStorageForUserAndProduct(user, product);

    if (storage == null) {
      // create new storage
      const newStorage = await ProductStorage.create({
        price,
        deliveryFee,
        quantity,
        owner: user,
        product
      });

      return ProductStorage.save(newStorage);
    }
    // add to existing storage
    storage.quantity += quantity;
    storage.price = price;
    storage.deliveryFee = deliveryFee;

    return ProductStorage.save(storage[0]);
  }

  public async removeProductFromUserStorage(product: Product, user: User, quantity: number) {
    const storage = await ProductStorage.findProductStorageForUserAndProduct(user, product);

    if (storage == null) {
      throw new BaseError("Could not remove product from storage because the storage doesnt exist. ");
    } else {
      if (storage.quantity < quantity) {
        throw new BaseError("Could not removed product from storage because the storage limit was exceded");
      } else {
        storage.quantity -= quantity;
        return ProductStorage.save(storage);
      }
    }
  }

  constructor(options: ProductServiceOptions) {
    super(options);
  }

  public static getInstance(options: ProductServiceOptions = {}) {
    if (!this.instance) {
      throw new Error("Product service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: ProductServiceOptions = {}) {
    const service = new ProductService(options);
    if (!this.instance) {
      this.instance = service;
    }
    return service;
  }

  async onMount(): Promise<void> {
    this.logger.debug("Mounting ProductService instance");
  }

  async onInit(): Promise<void> {
    this.logger.debug("Initializing ProductService instance");
  }

  async onReady(): Promise<void> {
    this.logger.info("ProductService initialized successfully");
  }

  async onUnmount(): Promise<void> {
    this.logger.debug("Unmounting ProductService instance");
  }
}
