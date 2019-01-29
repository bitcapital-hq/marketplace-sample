import { ServiceOptions, Service, BaseError } from 'ts-framework-common';
import BitcapitalService from './BitcapitalService';
import { DocumentType } from 'bitcapital-core-sdk';
import {User} from '../models'
import UserService from './UserService';


export interface DocumentServiceOptions extends ServiceOptions{

}

export default class DocumentService extends Service{
    protected static instance: DocumentService;

    public async getDocumentStatusForUser(id: string){
        const bitcapitalClient = BitcapitalService.getInstance({}).bitcapital;
        const user: User = await UserService.getInstance({}).getUser(id);

        return bitcapitalClient.consumers().findOne(user.bitcapitalId)
                                .then(consumer => {return consumer.status});
    }

    public async setDocumentForUser(id: string, photoBase64: string){
        const bitcapitalClient = BitcapitalService.getInstance({}).bitcapital;
        const user: User = await UserService.getInstance({}).getUser(id);

        if(user == null){
            throw new BaseError('Cannot find user with id', {id: id});
        }

        await bitcapitalClient.consumers().createDocument(user.bitcapitalId, {
            type: DocumentType.BRL_IDENTITY
        });

        const document = await bitcapitalClient.consumers().uploadDocumentPictureFromBase64(
            user.bitcapitalId,
            DocumentType.BRL_IDENTITY,
            "front",
            photoBase64
        );

        user.bitcapitalDocumentId = document.id
        User.save(user);

        return document;
    }

    constructor(options: DocumentServiceOptions) {
        super(options);
    }

    public static getInstance(options: DocumentServiceOptions) {
        if (!this.instance) {
          throw new Error("Document service is invalid or hasn't been initialized yet");
        }
        return this.instance;
    }
    
    public static initialize(options: DocumentServiceOptions) {
        const service = new DocumentService(options);
    
        if(!this.instance) {
          this.instance = service;
        }
    
        return service;
    }

    async onMount(): Promise<void> {
        this.logger.debug('Mounting DocumentService instance');
    }
    
    async onInit(): Promise<void> {
        this.logger.debug('Initializing DocumentService instance');
    }
    
    async onReady(): Promise<void> {
        this.logger.info('DocumentService initialized successfully');
    }
    
    async onUnmount(): Promise<void> {
        this.logger.debug('Unmounting DocumentService instance');
    }
}