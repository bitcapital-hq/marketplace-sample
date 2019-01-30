import { Controller, BaseRequest, BaseResponse, Get, Post } from "ts-framework";
import ProductService from '../services/ProductService';
import { Product, User } from "../models";
import { BaseError } from "ts-framework-common";

@Controller('/products')
export default class ProductController {

    @Get('/available')
    public static async listAvailableProducts(req: BaseRequest, res: BaseResponse) {
        return res.success(await ProductService.getInstance({}).listAvailableProducts());
    }

    @Post('/:name/buy')
    public static async buyProduct(req: BaseRequest, res: BaseResponse) {
        return res.success(ProductService.getInstance({})
                            .buyProduct(req.body.buyerId, req.body.sellerId, req.params.name, req.body.amount));
    }

    @Post('/create')
    public static async createProduct(req: BaseRequest, res: BaseResponse) {
        return res.success(await ProductService.getInstance({}).createProduct(
            req.body.name, req.body.description, req.body.url
        ));
    }

    @Post('/:name/sell')
    public static async addProductSellOffer(req: BaseRequest, res: BaseResponse) {
        const product: Product = await Product.findByName(req.params.name);
        const sellerId: User = await User.findById(req.body.sellerId);

        return res.success(ProductService.getInstance({})
                            .addProductToUserStorage(product, sellerId, req.body.amount, req.body.price, req.body.deliveryFee));
    }

}