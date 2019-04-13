const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const typeDefs = gql(fs.readFileSync(__dirname.concat('/schemas/movies.gql'), 'utf8'));
const resolvers = require('./schemas/movies.resolvers');


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server listening on url: ${url}`);
});
