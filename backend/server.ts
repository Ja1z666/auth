import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import 'dotenv/config';
import "reflect-metadata";
import { UserResolver } from './resolvers/userResolver';
import './strategy/localStrategy';
import './prismaConnect';

(async () => {
  const app = express();

  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365
    }
  }));

  app.use(passport.initialize());
	app.use(passport.session());

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