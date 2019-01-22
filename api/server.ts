// Keep config as first import
import Server, { ServerOptions } from 'ts-framework';
import * as Config from '../config';
import StatusController from './controllers/StatusController';
import UptimeService from './services/UptimeService';

export default class MainServer extends Server {
  constructor(options?: ServerOptions) {
    super({
      ...Config.server,
      router: {
        controllers: { StatusController }
      },
      children: [
        UptimeService.getInstance()
      ],
      ...options,
    });
  }
}
