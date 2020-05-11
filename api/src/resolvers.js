const resolvers = {
  Query: {
    viewer: (_, { id }) => ({
      id,
      firstName: "Anatoliy",
      lastName: "Gatt",
      occupation: "Software Engineer",
    }),
    values: async (_, __, { pgClient }) => {
      const values = await pgClient.query("SELECT * from values");
      return values.rows.map(({ number }) => number);
    },
  },
  Mutation: {
    addValue: async (_, { value }, { pgClient }) => {
      await pgClient.query("INSERT INTO values(number) VALUES($1)", [value]);
      return value;
    },
  },
};

module.exports = resolvers;
