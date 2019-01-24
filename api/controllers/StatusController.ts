import * as Package from 'pjson';
import { Controller, Get, BaseRequest, BaseResponse } from 'ts-framework';
import {User} from '../models';
import UptimeService from '../services/UptimeService';

@Controller('/')
export default class StatusController {

   /**
   * GET /
   * 
   * @description Simple redirect to status page.
   */
  @Get('/')
  static async home(req: BaseRequest, res: BaseResponse) {
    // return res.redirect('/status');

    const user = await User.create({
      name: '',
      email: ''
    });

    await user.validate();
    await user.save();
    return res.success(user);
  }

  /**
   * GET /status
   * 
   * @description Displays the server current information, such as version, env and uptime.
   */
  @Get('/status')
  static async getStatus(req: BaseRequest, res: BaseResponse) {
    const service = UptimeService.getInstance();
    
    return res.success({
      environment: process.env.NODE_ENV || 'development',
      uptime: service.uptime(),
      version: Package.version,
      name: Package.name,
    });
  }
}
