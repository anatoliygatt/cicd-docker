const resolvers = {
  Query: {
    viewer: (_, { id }) => ({
      id,
      firstName: "Anatoliy",
      lastName: "Gatt",
    }),
  },
};

module.exports = resolvers;
