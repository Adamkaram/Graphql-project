import { redis } from "../../redis";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
import { User } from "../../entity/User";
import { forgetPasswordPrfix } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./ChangePassword/ChangePasswordInput";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User , {nullable : true})

    async ChangePassword(@Arg("data") { token, password }: ChangePasswordInput,
        @Ctx() ctx : MyContext
    ): Promise<User | null> {
        
        const userId = await redis.get(forgetPasswordPrfix + token )
    
        if (!userId) {
            return null
        }
        const user = await User.findOne(userId);
        if (!user) {
            return null
        }
        redis.del(forgetPasswordPrfix + token )
        user.password = await argon2.hash(password);
        await user.save();
        ctx.req.session!.userId = user.id
        return user;
    }
}