import { Service, ServiceOptions, BaseError } from "ts-framework-common";
import { getManager } from "typeorm";
import { ProductStorage, User, Product, Extract } from "../models";
import { AssetService } from ".";

export interface ProductTransactionalServiceOptions extends ServiceOptions {}

export default class ProductTransactionalService extends Service {
  protected static instance: ProductTransactionalService;

  public async buyProduct(buyerId: string, sellerId: string, productName: string, quantity: number) {
    return await getManager().transaction(async transactionalEntityManager => {
      const buyer: User = await transactionalEntityManager
        .createQueryBuilder(User, "user")
        .where("user.id = :id", { id: buyerId })
        .getOne();

      const seller: User = await transactionalEntityManager
        .createQueryBuilder(User, "user")
        .where("user.id = :id", { id: sellerId })
        .getOne();

      const product: Product = await transactionalEntityManager
        .createQueryBuilder(Product, "product")
        .where("product.name = :name", { name: productName })
        .getOne();

      const sellerStorage: ProductStorage = await transactionalEntityManager
        .createQueryBuilder(ProductStorage, ProductStorage.tableName)
        .where("storage.ownerId = :ownerId AND storage.productId = :productId", {
          productId: product.id,
          ownerId: seller.id
        })
        .getOne();

      const assetService: AssetService = AssetService.getInstance();
      if (quantity <= 0) {
        throw new BaseError("Product quantity is invalid.", { quantity });
      }
      // não gostei disso mas é a vida
      if (sellerStorage == null || sellerStorage.quantity < quantity) {
        throw new BaseError("Storage limit exceeded or storage doesnt exist.", {
          ProductStorage: sellerStorage,
          amount: quantity
        });
      }
      const totalPrice = sellerStorage.price * quantity + sellerStorage.deliveryFee;

      await assetService.debitAssetFromUser(buyer, totalPrice);

      sellerStorage.quantity -= quantity;
      await transactionalEntityManager
        .createQueryBuilder()
        .update(ProductStorage)
        .set({ quantity })
        .where("id = :id", { id: sellerStorage.id })
        .execute();

      await assetService.creditAssetForUser(seller, totalPrice);

      if (sellerStorage.price <= 0 || sellerStorage.deliveryFee <= 0) {
        throw new BaseError("Price or delivery fee are invalid.", {
          price: sellerStorage.price
        });
      }

      const buyerStorage = await transactionalEntityManager
        .createQueryBuilder(ProductStorage, ProductStorage.tableName)
        .where("storage.ownerId = :ownerId AND storage.productId = :productId", {
          productId: product.id,
          ownerId: buyer.id
        })
        .getOne();

      if (buyerStorage == null) {
        // create new storage
        await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(ProductStorage)
          .values([
            {
              quantity,
              product,
              price: sellerStorage.price,
              deliveryFee: sellerStorage.deliveryFee,
              owner: buyer
            }
          ])
          .execute();
      } else {
        // add to existing storage
        buyerStorage.quantity += quantity;
        buyerStorage.price = sellerStorage.price;
        buyerStorage.deliveryFee = sellerStorage.deliveryFee;

        await transactionalEntityManager
          .createQueryBuilder()
          .update(ProductStorage)
          .set({ quantity: buyerStorage.quantity, price: buyerStorage.price, deliveryFee: buyerStorage.deliveryFee })
          .where("id = :id", { id: buyerStorage.id })
          .execute();
      }
      return await transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Extract)
        .values([
          {
            quantity,
            seller,
            storage: buyerStorage,
            totalValue: totalPrice,
            customer: buyer
          }
        ])
        .execute();
    });
  }

  constructor(options: ProductTransactionalServiceOptions) {
    super(options);
  }

  public static getInstance(options: ProductTransactionalServiceOptions = {}) {
    if (!this.instance) {
      throw new Error("Product service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: ProductTransactionalServiceOptions = {}) {
    const service = new ProductTransactionalService(options);
    if (!this.instance) {
      this.instance = service;
    }
    return service;
  }

  async onMount(): Promise<void> {
    this.logger.debug("Mounting ProductTransactionalService instance");
  }

  async onInit(): Promise<void> {
    this.logger.debug("Initializing ProductTransactionalService instance");
  }

  async onReady(): Promise<void> {
    this.logger.info("ProductTransactionalService initialized successfully");
  }

  async onUnmount(): Promise<void> {
    this.logger.debug("Unmounting ProductTransactionalService instance");
  }
}
