import { Controller, Post, BaseRequest, BaseResponse } from "ts-framework";
import AssetService from '../services/AssetService';
import { User } from "../models";

@Controller('/assets')
export default class AssetController {
    
    @Post('/debit')
    public static async debitAssetFromUser(req: BaseRequest, res: BaseResponse) {
        const user: User = await User.findById(req.body.userId);

        return res.success(AssetService.getInstance({}).creditAssetForUser(user, req.body.amount))
    }

    @Post('/credit')
    public static async creditAssetForUser(req: BaseRequest, res: BaseResponse) {
        const user: User = await User.findById(req.body.userId);

        return res.success(AssetService.getInstance({}).creditAssetForUser(user, req.body.amount))
    }
}