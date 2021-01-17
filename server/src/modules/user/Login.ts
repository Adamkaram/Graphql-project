import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
    async Login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext

    ): Promise<User | null> {
       
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('The email you entered doesn\'t belong to an account. Please check your email and try again.')
        }
        const valid = await argon2.verify(user.password, password)

        if (!valid) {
            throw new Error('password you entered is wrong . Please check your password and try again.')
        }
        if (!user.Confirmed) {
            return null;
        }

        ctx.req.session.userId = user.id
        return user;
    }


}