import { Service, ServiceOptions } from "ts-framework-common";
import Bitcapital, { Session, StorageUtil, MemoryStorage } from "bitcapital-core-sdk";
import * as Config from "../../config";

export interface BitcapitalServiceOptions extends ServiceOptions {}

export default class BitcapitalService extends Service {
  protected static instance: BitcapitalService;
  public bitcapital: Bitcapital;

  constructor(options: BitcapitalServiceOptions) {
    super(options);
  }

  public static getInstance(options: BitcapitalServiceOptions = {}) {
    if (!this.instance) {
      throw new Error("Bitcapital service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: BitcapitalServiceOptions = {}) {
    const service = new BitcapitalService(options);
    if (!this.instance) {
      this.instance = service;
    }
    return service;
  }

  async onMount(): Promise<void> {
    this.logger.debug("Mounting BitcapitalService instance");
    const sessionConfig = { ...Config.bitcapital };

    const session = new Session({
      http: sessionConfig,
      oauth: sessionConfig,
      storage: new StorageUtil("session", new MemoryStorage())
    });

    // Initialize service instances
    this.bitcapital = Bitcapital.initialize({ session, ...sessionConfig });
  }

  async onInit(): Promise<void> {
    const credentials = await this.bitcapital.session().password({
      username: Config.bitcapital.email,
      password: Config.bitcapital.password
    });

    this.logger.info("Successfully authenticated in Bitcapital platform", { credentials });
  }

  async onReady(): Promise<void> {
    this.logger.info("BitcapitalService initialized successfully");
  }

  async onUnmount(): Promise<void> {
    this.logger.debug("Unmounting BitcapitalService instance");
  }
}
