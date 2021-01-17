import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import connectRedis from "connect-redis";
import Express from 'express'
import { createConnection } from "typeorm";
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import session from "express-session";
import { RedisClient } from "redis";
import { redis } from "./redis";
import cors from "cors"
import { createSchema } from "./utils/CreateSchema";


const main = async () => {
  
  await createConnection();
  const schema = await createSchema();
  const apolloserver = new ApolloServer({
    schema, formatError: (error: GraphQLError): GraphQLFormattedError => {
      if (error && error.extensions) {
        error.extensions.code = 'GRAPHQL_VALIDATION_FAILED';
      }
      return error;
    },
    context: ({ req  , res }: any) => ({ req , res})
  });
  const app = Express();
  const SESSION_SECRET = process.env.SESSION_SECRET;
  const RedisStore = connectRedis(session);
  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }))

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: (redis as unknown) as RedisClient,
    }),
    name: "qid",
    secret: SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  apolloserver.applyMiddleware({ app , cors : false })

  app.listen(4000, () => {
    console.log`server is started im http://localhost:4000`
  })
}

main();