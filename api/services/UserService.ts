import { Service, ServiceOptions } from 'ts-framework-common';
import {User} from '../models'

export interface UserServiceOptions extends ServiceOptions{

}

export default class UserService extends Service {
    protected static instance: UserService;

    public static async getUser(id: string){
        return User.findById(id);
    }

    constructor(options: UserServiceOptions) {
        super(options);
    }

    public static getInstance(options: UserServiceOptions) {
        if (!this.instance) {
          throw new Error("User service is invalid or hasn't been initialized yet");
        }
        return this.instance;
    }
    
    public static initialize(options: UserServiceOptions) {
        const service = new UserService(options);
    
        if(!this.instance) {
          this.instance = service;
        }
    
        return service;
    }

    async onMount(): Promise<void> {
        this.logger.debug('Mounting UserService instance');
    }
    
    async onInit(): Promise<void> {
        this.logger.debug('Initializing UserService instance');
    }
    
    async onReady(): Promise<void> {
        this.logger.info('UserService initialized successfully');
    }
    
    async onUnmount(): Promise<void> {
        this.logger.debug('Unmounting UserService instance');
    }
}