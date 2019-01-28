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
import { Logger } from 'ts-framework-common';
import AssetService from './services/AssetService';
import ProductService from './services/ProductService';
import AssetController from './controllers/AssetController';
import ProductController from './controllers/ProductController';

const sentry = process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : undefined;
const logger = Logger.getInstance({ sentry });

export default class MainServer extends Server {
  protected bitcapital: Bitcapital;

  constructor(options?: ServerOptions) {
    super({
      ...Config.server,
      router: {
        controllers: { UserController,
                        AssetController,
                        ProductController }
      },
      children: [
        MainDatabase.getInstance(),
        UptimeService.getInstance(),
        UserService.initialize({}),
        ExtractService.initialize({}),
        BitcapitalService.initialize({}),
        DocumentService.initialize({}),
        AssetService.initialize({}),
        ProductService.initialize({})
      ],
      ...options,
    });
  }
}
