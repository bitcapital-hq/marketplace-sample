import { Service, ServiceOptions, BaseError } from 'ts-framework-common';
import { User } from "../models";
import BitcapitalService from "./BitcapitalService";
import { UserRole, Wallet } from "bitcapital-core-sdk";

export interface UserServiceOptions extends ServiceOptions {}

export default class UserService extends Service {
  protected static instance: UserService;

  public async getUser(id: string) {
      const user = await User.findById(id);
      if(user == null){
        throw new BaseError('User with id doesnt exist.', {id});
      }
      return user;
  }

  public async getUserBalance(id: string) {
    const user: User = await this.getUser(id);
    const bitcapitalClient = BitcapitalService.getInstance().bitcapital;

    const wallet: Wallet = await bitcapitalClient.wallets().findOne(user.bitcapitalWalletId);
    return wallet.balances;
  }

  public async createUser(body: any) {
    const user = await User.create({
      name: body.name,
      email: body.email,
      document: body.document,
      status: body.status,
      telephoneCountryCode: body.telephoneCountryCode,
      telephoneRegionalCode: body.telephoneRegionalCode,
      telephoneNumber: body.telephoneNumber,
      residenceNumber: body.residenceNumber,
      residenceZipcode: body.residenceZipcode,
      residenceInformation: body.residenceInformation,
      residenceReference: body.residenceReference,
      accountAgencyNumber: body.accountAgencyNumber,
      accountBankNumber: body.accountBankNumber,
      accountNumber: body.accountNumber
    });

    await user.validate();

    // Register user in the bitcapital platform
    const bitcapitalUser = await this.createUserOnBitcapital(body);

    user.bitcapitalId = bitcapitalUser.id;
    user.bitcapitalWalletId = bitcapitalUser.wallets[0].id;

    // Save info in database
    return user.save();
  }

  public async createUserOnBitcapital(body: any) {
    const bitcapital = BitcapitalService.getInstance().bitcapital;

    return bitcapital.consumers().create({
      firstName: body.name,
      lastName: body.name,
      email: body.email,
      role: UserRole.CONSUMER,
      consumer: {
        taxId: body.document,
        phones: [
          {
            code: body.telephoneRegionalCode,
            number: body.telephoneNumber
          }
        ],
        addresses: [
          {
            country: "BR",
            state: "SP",
            city: "São Paulo",
            code: body.residenceZipcode,
            street: "Av Paulista",
            number: body.residenceNumber,
            neighborhood: "Bela Vista",
            complement: body.residenceInformation,
            reference: body.residenceReference
          }
        ]
      }
    } as any);
  }

  constructor(options: UserServiceOptions) {
    super(options);
  }

  public static getInstance(options: UserServiceOptions = {}) {
    if (!this.instance) {
      throw new Error("User service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: UserServiceOptions = {}) {
    const service = new UserService(options);

    if (!this.instance) {
      this.instance = service;
    }

    return service;
  }

  async onMount(): Promise<void> {
    this.logger.debug("Mounting UserService instance");
  }

  async onInit(): Promise<void> {
    this.logger.debug("Initializing UserService instance");
  }

  async onReady(): Promise<void> {
    this.logger.info("UserService initialized successfully");
  }

  async onUnmount(): Promise<void> {
    this.logger.debug("Unmounting UserService instance");
  }
}
