// Keep config as first import
import Bitcapital, {Session, StorageUtil, MemoryStorage} from 'bitcapital-core-sdk';
import Server, { ServerOptions } from 'ts-framework';
import * as Config from '../config';
import UserController from './controllers/UserController';
import {UptimeService, UserService} from './services';
import MainDatabase from './database';
import ExtractService from './services/ExtractService';
import BitcapitalService from './services/BitcapitalService';
import DocumentService from './services/DocumentService';

export default class MainServer extends Server {
  protected bitcapital: Bitcapital;

  constructor(options?: ServerOptions) {
    super({
      ...Config.server,
      router: {
        controllers: { UserController }
      },
      children: [
        MainDatabase.getInstance(),
        UptimeService.getInstance(),
        UserService.initialize({}),
        ExtractService.initialize({}),
        BitcapitalService.initialize({}),
        DocumentService.initialize({})
      ],
      ...options,
    });
  }
}
