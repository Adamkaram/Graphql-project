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

const meQuery = `
 {
    me{
        id 
        firstName 
        lastName 
        email 
        name
    }
}
`;
describe('Me', () => {
    it('get User', async () => {
        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save();

        const res = await gCall({
            source: meQuery,
            userId: user.id,

        });
        console.log(res)
        expect(res).toMatchObject({
            data: {
                me: {
                    id : `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email : user.email
                }
            }
        })
    });
    it("return null", async () => {
        const res = await gCall({
            source: meQuery,

        });
        console.log(res)
        expect(res).toMatchObject({
            data: {
                me: null
            }
        }) 
    })
});

