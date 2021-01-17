import { BaseCreateUserResolver } from "src/modules/user/CreatUser";
import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgetPasswordResolver } from "../modules/user/ForgetPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgetPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      BaseCreateUserResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });