import UserService from '../../api/services/UserService';
import { User } from '../../api/models';
import MainServer from '../../api/server';
import { userInfo } from 'os';

jest.setTimeout(60000);
const CPF = require('cpf');


describe("api.services.UserService", () => {
    let server;

    beforeAll(async () => {
        server = new MainServer();
        await server.onInit();
    });
    
    afterAll(async () => {
        await server.close();
    });

    it("should create a user", async () => {
        // generate new random user every time
        const cpf = CPF.generate(false, false);
        const email = "danilo.mendes." + cpf + "@bitcapital.com.br";
        
        const user: User = await UserService.getInstance({}).createUser({
			"name": "Danilo",
            "email": email,
            "document": cpf,
            "status": "ACTIVE",
            "telephoneCountryCode": "55",
            "telephoneRegionalCode": "19",
            "telephoneNumber": "996416288",
            "residenceNumber": "130",
            "residenceZipcode": "13087460",
            "residenceInformation": "Integration test",
            "residenceReference": "Integration test",
            "accountAgencyNumber": "88",
            "accountBankNumber": "1111",
            "accountNumber": "123123"
        });

        expect(user.name).toBe('Danilo');
        expect(user.bitcapitalId).toBeDefined();
        expect(user.bitcapitalWalletId).toBeDefined();

    })

    it("should return error when creating a user", async () => {
        
    });
  });