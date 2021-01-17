
import { logoutMuation } from "../graphql/user/mutations/logout";
import { MyContext } from "../interfaces/MyContext";
import redirect from "../lib/redirect";


const Logout = () => {
    return null;
}
Logout.getInitialProps = async ({apolloClient , ...ctx } : MyContext) => {
    await apolloClient.mutate({ mutation: logoutMuation})
    await apolloClient.resetStore();
  redirect(ctx , "/login")
    return {};
}
export default Logout;