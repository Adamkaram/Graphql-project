import { User } from "src/entity/User";
import { Resolver, Arg, Mutation, ClassType, UseMiddleware, } from "type-graphql";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { RegisterInput } from "./Register/RegisterInput";

function createResolver<T extends ClassType, X extends ClassType>(
    suffix: string, //resolver Name 
    returnType: T, // what it will return 
    inputType: X, // what it takes for Arg or input types [firstName , lastName , password ]  
    entity : any , // entity type (data-base)
    middleware? : Middleware<any>[]    
) {
    @Resolver()
     class BaseResolver {
        @Mutation(() => returnType, { name: `create${suffix}` })
        @UseMiddleware(...(middleware ||[]) ) // it will run before resolver run
        async create(
            @Arg("data", () => inputType) data: RegisterInput
        ) {
            return entity.create(data).save();
        }
    }
    return BaseResolver;
}

export const BaseCreateUserResolver = createResolver("User", User , RegisterInput , User);


// @Resolver()
// export class CreateUserResolver {
//     @Mutation(() => User)
//     async createUser(
//         @Arg("data") data: RegisterInput
//     ) {
//         return User.create(data).save();
//     }
// }