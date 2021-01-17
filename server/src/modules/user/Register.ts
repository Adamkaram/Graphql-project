import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import argon2 from "argon2";
import { User } from "../../entity/User";
import { RegisterInput } from "./Register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { sendEmail } from "../utils/SendMail";
import { CreateConfirmationUrl } from "../utils/CreateConfirmationUrl";

@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth)
    @Query(() => String)
    async hello() {
        return 'hello world'
    }


    @Mutation(() => User)
    async Register(
        @Arg('data') { email, firstName, lastName, password }: RegisterInput,

    ): Promise<User> {
        const hashPassword = await argon2.hash(password);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        }).save();
        await sendEmail(email , await CreateConfirmationUrl(user.id))
        return user;
    }
}