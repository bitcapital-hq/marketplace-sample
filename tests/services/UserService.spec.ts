import UserService from '../../api/services/UserService';
import { User } from '../../api/models';
import MainServer from '../../api/server';
import * as Config from '../../config';

jest.setTimeout(60000);

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
        const user: User = await UserService.getInstance({}).createUser({
			"name": " Danilo",
            "email": "danilo.mendes.lindao23@bitcapital.com.br",
            "document": "41827185856",
            "status": "ACTIVE",
            "telephoneCountryCode": "55",
            "telephoneRegionalCode": "19",
            "telephoneNumber": "996416288",
            "residenceNumber": "130",
            "residenceZipcode": "13087460",
            "residenceInformation": "Apartamento 33 torre 2",
            "residenceReference": "Do lado da dorgaria",
            "accountAgencyNumber": "88",
            "accountBankNumber": "1111",
            "accountNumber": "123123"
        });

        expect(user.name).toBe('Danilo');
        expect(user.bitcapitalId).toBeDefined();
    });
  });