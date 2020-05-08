const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const app = express();

app.set("port", process.env.PORT || 3000);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

server.applyMiddleware({ app });

app.listen(app.get("port"), () => {
  console.log(
    `cicd-docker is up and running! Listening on port ${app.get("port")}`
  );
});
