import * as Package from 'pjson';
import { Controller, Get, BaseRequest, BaseResponse, Post } from 'ts-framework';
import {User} from '../models';
import { UserService, ExtractService } from '../services/';
import DocumentService from '../services/DocumentService';

@Controller('/users')
export default class UserController {

  @Get('/:id')
  static async getUser(req: BaseRequest, res: BaseResponse) {
    return res.success({
      user: await UserService.getInstance({}).getUser(req.params.id)
    });
  }

  @Get('/:id/extract')
  static async getUserExtract(req: BaseRequest, res: BaseResponse) {
    const [buys, sells] = await Promise.all([
      ExtractService.getInstance({}).getBuyExtractForUser(req.params.id),
      ExtractService.getInstance({}).getSellExtractForUser(req.params.id)
    ]);
    
    return res.success({ buys, sells });
  }

  @Get('/:id/stellar-extract')
  static async getUserCryptoExtract(req: BaseRequest, res: BaseResponse) {
    return res.success(await ExtractService.getInstance({}).getBitcapitalExtractForUser(req.params.id));
  }

  @Get('/:id/document')
  static async getKycStatusForUser(req: BaseRequest, res: BaseResponse) {
    return res.success(await DocumentService.getInstance({}).getDocumentStatusForUser(req.params.id));
  }

  @Post('/signup')
  static async userSignup(req: BaseRequest, res: BaseResponse) {
    return res.success(await UserService.getInstance({}).createUser(req.body));
  }

  @Post('/:id/document')
  static async sendKYCDocuments(req: BaseRequest, res: BaseResponse) {
    const photo = (req as any).file;

    return res.success(await DocumentService.getInstance({})
              .setDocumentForUser(req.params.id, Buffer.from(photo.buffer).toString('base64')));
  }
}
