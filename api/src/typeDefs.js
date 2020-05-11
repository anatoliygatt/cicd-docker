const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    occupation: String!
  }

  type Query {
    viewer(id: ID!): User
    values: [Int!]!
  }

  type Mutation {
    addValue(value: Int!): Int
  }
`;

module.exports = typeDefs;
