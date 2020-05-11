const express = require("express");
const { Pool } = require("pg");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const app = express();

const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.set("port", process.env.PORT || 3000);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: () => ({
    pgClient,
  }),
});

server.applyMiddleware({ app });

app.listen(app.get("port"), () => {
  console.log(
    `cicd-docker is up and running! Listening on port ${app.get("port")}`
  );
});
