import * as Package from 'pjson';
import { Controller, Get, BaseRequest, BaseResponse, Post } from 'ts-framework';
import {User} from '../models';
import { UserService, ExtractService } from '../services/';

@Controller('/user')
export default class UserController {

  @Get('/:id')
  static async getUser(req: BaseRequest, res: BaseResponse) {
    return res.success({
      user: await UserService.getUser(req.params.id)
    });
  }

  @Get('/:id/kyc')
  static async getKycStatusForUser(req: BaseRequest, res: BaseResponse) {

  }

  @Get('/:id/extract')
  static async getUserExtract(req: BaseRequest, res: BaseResponse) {
    return res.success({
      buys: await ExtractService.getBuyExtractForUser(req.params.id),
      sells: await ExtractService.getSellExtractForUser(req.params.id)
    });
  }

  @Get('/:id/crypto-extract')
  static async getUserCryptoExtract(req: BaseRequest, res: BaseResponse) {

  }

  @Post('/signup')
  static async userSignup(req: BaseRequest, res: BaseResponse) {
    return res.success(await UserService.getInstance({}).createUser(req.body));
  }

  @Post('/:id/documents')
  static async sendKYCDocuments(req: BaseRequest, res: BaseResponse) {
    
  }
}
