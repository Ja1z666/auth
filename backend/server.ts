import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import * as express from 'express';
import "reflect-metadata";
import { UserResolver } from './resolvers/userResolver';
import './prismaConnect';

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: true });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();