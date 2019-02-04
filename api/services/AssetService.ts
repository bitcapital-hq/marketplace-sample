import { ServiceOptions, Service } from "ts-framework-common";
import BitcapitalService from "./BitcapitalService";
import { User } from "../models";
import { asset } from "../../config";

export interface AssetServiceOptions extends ServiceOptions {}

export default class AssetService extends Service {
  protected static instance: AssetService;

  // this sucks, i know
  private static assetId: string = asset.id;

  constructor(options: AssetServiceOptions) {
    super(options);
  }

  public async creditAssetForUser(receiver: User, amount: number) {
    const bitcapitalClient = BitcapitalService.getInstance().bitcapital;

    return bitcapitalClient.assets().emit({
      amount: amount.toString(),
      destination: receiver.bitcapitalWalletId,
      id: AssetService.assetId
    });
  }

  public async debitAssetFromUser(sender: User, amount: number) {
    const bitcapitalClient = BitcapitalService.getInstance().bitcapital;

    return bitcapitalClient.assets().destroy({
      amount: amount.toString(),
      source: sender.bitcapitalWalletId,
      id: AssetService.assetId
    });
  }

  public static getInstance(options: AssetServiceOptions = {}) {
    if (!this.instance) {
      throw new Error("Asset service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: AssetServiceOptions = {}) {
    const service = new AssetService(options);
    if (!this.instance) {
      this.instance = service;
    }
    return service;
  }

  async onMount(): Promise<void> {
    this.logger.debug("Mounting AssetService instance");
  }

  async onInit(): Promise<void> {
    this.logger.debug("Initializing AssetService instance");
  }

  async onReady(): Promise<void> {
    this.logger.info("AssetService initialized successfully");
  }

  async onUnmount(): Promise<void> {
    this.logger.debug("Unmounting AssetService instance");
  }
}
