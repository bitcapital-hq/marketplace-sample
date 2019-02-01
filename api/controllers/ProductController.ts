import { Controller, BaseRequest, BaseResponse, Get, Post } from "ts-framework";
import ProductService from "../services/ProductService";
import { Product, User } from "../models";
import { BaseError, LoggerInstance } from 'ts-framework-common';
import StorageWrapper from '../wrappers/StorageWrapper';

@Controller("/products")
export default class ProductController {
  
  @Get("/available")
  public static async listAvailableProducts(req: BaseRequest, res: BaseResponse) {

    const products = await ProductService.getInstance({}).listAvailableProducts();
    const result = products.map(StorageWrapper.getInstance().wrap);

    return res.success(result);
  }

  @Post("/:name/buy")
  public static async buyProduct(req: BaseRequest, res: BaseResponse) {
    const { buyerId, sellerId, amount }: { buyerId: string; sellerId: string; amount: number } = req.body;

    const { name }: { name: string } = req.params;
    const result = await ProductService.getInstance().buyProduct(buyerId, sellerId, name, amount);

    return res.success(result);
  }

  @Post("/create")
  public static async createProduct(req: BaseRequest, res: BaseResponse) {
    const { name, description, url }: { name: string; description: string; url: string } = req.body;

    const product = await ProductService.getInstance().createProduct(name, description, url);
    return res.success(product);
  }

  @Post("/:name/sell")
  public static async addProductSellOffer(req: BaseRequest, res: BaseResponse) {
    const {
      sellerId,
      amount,
      price,
      deliveryFee
    }: { sellerId: string; amount: number; price: number; deliveryFee: number } = req.body;
    const { name }: { name: string } = req.params;
    const product: Product = await Product.findByName(name);
    const seller: User = await User.findById(sellerId);

    const storage = await ProductService.getInstance().addProductToUserStorage(
      product,
      seller,
      amount,
      price,
      deliveryFee
    );

    return res.success(storage);
  }
}
