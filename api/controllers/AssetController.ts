import { Controller, Post, BaseRequest, BaseResponse } from "ts-framework";
import AssetService from "../services/AssetService";
import { User } from "../models";
import PaymentWrapper from "../wrappers/PaymentWrapper";

@Controller("/assets")
export default class AssetController {
  @Post("/debit")
  public static async debitAssetFromUser(req: BaseRequest, res: BaseResponse) {
    const { userId, amount }: { userId: string; amount: number } = req.body;
    const user: User = await User.findById(userId);

    const payment = await AssetService.getInstance().debitAssetFromUser(user, amount);
    const result = PaymentWrapper.getInstance().wrap(payment);
    return res.success(result);
  }

  @Post("/credit")
  public static async creditAssetForUser(req: BaseRequest, res: BaseResponse) {
    const { userId, amount }: { userId: string; amount: number } = req.body;
    const user: User = await User.findById(userId);

    const payment = await AssetService.getInstance().creditAssetForUser(user, amount);
    const result = PaymentWrapper.getInstance().wrap(payment);
    return res.success(result);
  }
}
