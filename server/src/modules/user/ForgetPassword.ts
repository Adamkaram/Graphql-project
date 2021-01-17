import { redis } from "../../redis";
import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { sendEmail } from "../utils/SendMail";
import { User } from "../../entity/User";
import { forgetPasswordPrfix } from "../constants/redisPrefixes";

@Resolver()
export class ForgetPasswordResolver {
    @Mutation(() => Boolean)

    async ForgetPassword(@Arg("email") email: string): Promise<Boolean> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return true;
        }

        const token = v4();
        await redis.set(forgetPasswordPrfix +token, user.id, "ex", 60 * 60 * 24) // 1 day expiration 60 min * 60 seconde 24 is 24 hours
    
        await sendEmail(email, `${process.env.Domain}/user/Change-Password/${token} `)
        return true;
    }
}