import * as Package from 'pjson';
import { Controller, Get, BaseRequest, BaseResponse, Post } from 'ts-framework';
import {User} from '../models';
import { UserService } from '../services/';

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

  }

  @Get('/:id/crypto-extract')
  static async getUserCryptoExtract(req: BaseRequest, res: BaseResponse) {

  }

  @Post('/:id/signup')
  static async userSignup(req: BaseRequest, res: BaseResponse) {
    
  }

  @Post('/:id/documents')
  static async sendKYCDocuments(req: BaseRequest, res: BaseResponse) {
    
  }
}
