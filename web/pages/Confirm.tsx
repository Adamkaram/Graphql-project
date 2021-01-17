import * as React from "react";
import {
  ConfirmUserMutation,
  ConfirmUserMutationVariables
} from "../generated/apolloComponents";
import { confirmUserMutation } from "../graphql/user/mutations/ComfirmUser";
import { MyContext } from "../interfaces/MyContext";
import redirect from "../lib/redirect";

export default class Confirm extends React.PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!token) {
      return {};
    }

    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserMutationVariables>({
      mutation: confirmUserMutation,
      variables: {
        token: token as string
      }
    });

    redirect(ctx, "/login");

    return {};
  }

  render() {
    return "something went wrong";
  }
}