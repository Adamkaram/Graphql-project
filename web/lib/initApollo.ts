import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject
  } from "apollo-boost";
  import { setContext } from "apollo-link-context";
  import { createHttpLink } from "apollo-link-http";
  import fetch from "isomorphic-unfetch";
  import { isBrowser } from "./isBrowser";
  import { onError } from "@apollo/client/link/error";
import Router  from "next/router";

  let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
  
  // Polyfill fetch() on the server (used by apollo-client)
  if (!isBrowser) {
    (global as any).fetch = fetch;
  }
  
  interface Options {
    getToken: () => string;
  }
  
  function create(initialState: any, { getToken }: Options) {
    const httpLink = createHttpLink({
      //our server
      uri: "http://localhost:4000/graphql",
      credentials: "include"
    });
  
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>{
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
          if (isBrowser && message.includes("not authenticated")) {
            Router.replace("/login")
          }}
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    // adding any kind of stuff to header
    const authLink = setContext((_, { headers }) => {
      // recieve it from initApollo
      const token = getToken();
      return {
        headers: {
          ...headers,
          //grab the tokeen and pass it to the header
          cookie: token ? `qid=${token}` : ""
        }
      };
    });
  
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
      connectToDevTools: isBrowser,
      ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
      link: errorLink.concat(authLink.concat(httpLink)),
      cache: new InMemoryCache().restore(initialState || {})
    });
  }
  
  export default function initApollo(initialState: any, options: Options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!isBrowser) {
      return create(initialState, options);
    }
  
    // Reuse client on the client-side
    if (!apolloClient) {
      apolloClient = create(initialState, options);
    }
  
    return apolloClient;
  }
  