import * as Package from 'pjson';
import { Controller, Get, BaseRequest, BaseResponse, Post } from 'ts-framework';
import {User} from '../models';
import { UserService, ExtractService } from '../services/';
import DocumentService from '../services/DocumentService';

@Controller('/users')
export default class UserController {

  @Get('/:id')
  static async getUser(req: BaseRequest, res: BaseResponse) {
    const { id }: { id: string } = req.params;

    const user = await UserService.getInstance().getUser(id);
    return res.success(user);
  }

  @Get('/:id/balance')
  static async getUserBalance(req: BaseRequest, res: BaseResponse){
    const { id }: { id: string } = req.params;

    const balance = await UserService.getInstance().getUserBalance(id);
    return res.success(balance);
  }

  @Get('/:id/extract')
  static async getUserExtract(req: BaseRequest, res: BaseResponse) {
    const { id }: { id: string } = req.params

    const [buys, sells] = await Promise.all([
      ExtractService.getInstance().getBuyExtractForUser(id),
      ExtractService.getInstance().getSellExtractForUser(id)
    ]);
    
    return res.success({ buys, sells });
  }

  @Get('/:id/stellar-extract')
  static async getUserCryptoExtract(req: BaseRequest, res: BaseResponse) {
    const { id }: { id: string } = req.params

    const extract = await ExtractService.getInstance().getBitcapitalExtractForUser(id)
    return res.success(extract);
  }

  @Get('/:id/document')
  static async getKycStatusForUser(req: BaseRequest, res: BaseResponse) {
    const { id }: { id: string } = req.params

    const document = await DocumentService.getInstance().getDocumentStatusForUser(id);
    return res.success(document);
  }

  @Post('/signup')
  static async userSignup(req: BaseRequest, res: BaseResponse) {
    const user = await UserService.getInstance().createUser(req.body);
    return res.success(user);
  }

  @Post('/:id/document')
  static async sendKYCDocuments(req: BaseRequest, res: BaseResponse) {
    const { id }: { id: string } = req.params
    const photo = (req as any).file;

    const result = await DocumentService.getInstance()
                            .setDocumentForUser(id, Buffer.from(photo.buffer).toString('base64'));
    return res.success(result);
  }
}
