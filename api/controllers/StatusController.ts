import * as Package from 'pjson';
import { Controller, Get, BaseRequest, BaseResponse } from 'ts-framework';
import UptimeService from '../services/UptimeService';

@Controller()
export default class StatusController {

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