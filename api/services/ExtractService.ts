import { Service, ServiceOptions } from 'ts-framework-common';
import { Extract, User, ProductStorage } from '../models';
import BitcapitalService from './BitcapitalService';

export interface ExtractServiceOptions extends ServiceOptions{
}

export default class ExtractService extends Service {
    protected static instance: ExtractService;

    constructor(options: ExtractServiceOptions) {
        super(options);
    }

    public async createExtract
    (totalValue: number, quantity: number, customer: User, seller: User, storage: ProductStorage){
        const extract = await Extract.create({
            totalValue: totalValue,
            quantity: quantity,
            customer: customer,
            seller: seller,
            storage: storage
        });

        await extract.validate();
        return await extract.save();
    }

    public async getBitcapitalExtractForUser(id: string){
        const bitcapitalClient = BitcapitalService.getInstance({}).bitcapital;
        const user = await User.findOne(id);

        return bitcapitalClient.wallets().findWalletPayments(user.bitcapitalWalletId, {});
    }

    public async getBuyExtractForUser(id: string){
        return Extract.getBuysForUser(id);
    }

    public async getSellExtractForUser(id: string){
        return Extract.getSellsForUser(id);
    }

    public static getInstance(options: ExtractServiceOptions) {
        if (!this.instance) {
          throw new Error("Extract service is invalid or hasn't been initialized yet");
        }
        return this.instance;
    }
    
    public static initialize(options: ExtractServiceOptions) {
        const service = new ExtractService(options);
        if(!this.instance) {
          this.instance = service;
        }
        return service;
    }

    async onMount(): Promise<void> {
        this.logger.debug('Mounting ExtractService instance');
    }
    
    async onInit(): Promise<void> {
        this.logger.debug('Initializing ExtractService instance');
    }
    
    async onReady(): Promise<void> {
        this.logger.info('ExtractService initialized successfully');
    }
    
    async onUnmount(): Promise<void> {
        this.logger.debug('Unmounting ExtractService instance');
    }
}