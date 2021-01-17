import { Arg ,  Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { confirmUserPrfix } from "../constants/redisPrefixes";

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async ConfirmUser(
        @Arg("token") token: string): Promise<Boolean> {
        const userID = await redis.get(confirmUserPrfix + token);
        
        if (!userID) {
            return false;
     }

       await User.update({id : parseInt(userID , 10)} , {Confirmed : true} ) 
        await redis.del(token);
        return true; 
    }
}