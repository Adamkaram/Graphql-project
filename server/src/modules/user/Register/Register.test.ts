import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn"
import { Connection } from "typeorm";
import faker from "faker"
import { User } from "../../../entity/User";
let conn: Connection;
beforeAll(async () => {
    conn = await testConn()
})

afterAll(async () => {
    conn.close();
})
jest.setTimeout(30000)

const registerMutation = `
mutation Register ($data : RegisterInput!) {
    Register (data : $data){
        id 
        firstName 
        lastName 
        email 
        name
    }
}
`;
describe('Register', () => {
    it('Create User', async () => {
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await gCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        })
        expect(res).toMatchObject({
            data: {
                Register: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,

                }
            }
        })
        const dbUser = await User.findOne({ where: { email: user.email } })
        expect(dbUser).toBeDefined();
        expect(dbUser!.Confirmed).toBeFalsy()
        expect(dbUser!.firstName).toBe(user.firstName)
    })
})
