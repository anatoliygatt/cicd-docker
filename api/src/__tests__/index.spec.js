const { ApolloServer } = require("apollo-server-express");
const { createTestClient } = require("apollo-server-testing");
const typeDefs = require("../typeDefs");
const resolvers = require("../resolvers");

describe("queries", () => {
  it("should return viewer details", async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const { query } = createTestClient(server);
    const res = await query({
      query: `
        query {
          viewer(id: "5c0e3aad39c4c3481c0b8743") {
            id
            firstName
            lastName
          }
        }
      `,
    });
    expect(res.data).toMatchSnapshot();
  });
});
