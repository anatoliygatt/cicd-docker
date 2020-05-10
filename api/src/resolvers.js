const resolvers = {
  Query: {
    viewer: (_, { id }) => ({
      id,
      firstName: "Anatoliy",
      lastName: "Gatt",
      occupation: "Software Engineer",
    }),
  },
};

module.exports = resolvers;
