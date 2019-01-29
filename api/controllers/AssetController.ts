import { Controller, Post, BaseRequest, BaseResponse } from "ts-framework";
import AssetService from '../services/AssetService';
import { User } from "../models";

@Controller('/assets')
export default class AssetController {
    
    @Post('/debit')
    public static async debitAssetFromUser(req: BaseRequest, res: BaseResponse) {
        const { userId, amount }: { userId: string, amount: number } = req.body
        const user: User = await User.findById(userId);

        return res.success(AssetService.getInstance().creditAssetForUser(user, amount))
    }

    @Post('/credit')
    public static async creditAssetForUser(req: BaseRequest, res: BaseResponse) {
        const { userId, amount }: { userId: string, amount: number } = req.body
        const user: User = await User.findById(userId);

        return res.success(AssetService.getInstance().creditAssetForUser(user, amount))
    }
}