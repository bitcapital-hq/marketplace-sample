import { Service, ServiceOptions } from 'ts-framework-common';
import { Extract } from '../models';

export interface ExtractServiceOptions extends ServiceOptions{
}

export default class ExtractService extends Service {
    protected static instance: ExtractService;

    constructor(options: ExtractServiceOptions) {
        super(options);
    }

    public static async getBuyExtractForUser(id: string){
        return Extract.getBuysForUser(id);
    }

    public static async getSellExtractForUser(id: string){
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