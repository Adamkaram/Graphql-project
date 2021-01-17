import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { NextPageContext } from "next";

export interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}