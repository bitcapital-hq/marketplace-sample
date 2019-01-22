// Keep config as first import
import Bitcapital, {Session, StorageUtil, MemoryStorage} from 'bitcapital-core-sdk';
import Server, { ServerOptions } from 'ts-framework';
import * as Config from '../config';
import StatusController from './controllers/StatusController';
import UptimeService from './services/UptimeService';
import MainDatabase from './database';

export default class MainServer extends Server {
  protected bitcapital: Bitcapital;

  constructor(options?: ServerOptions) {
    super({
      ...Config.server,
      router: {
        controllers: { StatusController }
      },
      children: [
        MainDatabase.getInstance(),
        UptimeService.getInstance()
      ],
      ...options,
    });
  }

  async onReady() {
    await super.onReady();
    const sessionConfig = { ...Config.bitcapital };

    const session = new Session({
      http: sessionConfig,
      oauth: sessionConfig,
      storage: new StorageUtil("session", new MemoryStorage())
    });

    // Initialize service instances
    this.bitcapital = Bitcapital.initialize({ session, ...sessionConfig });
    const credentials = await this.bitcapital.session().password({
      username: Config.bitcapital.email,
      password: Config.bitcapital.password,
    });

    this.logger.info('Successfully authenticated in Bitcapital platform', { credentials });
  }
}
