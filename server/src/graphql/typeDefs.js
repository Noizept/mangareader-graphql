const gql = require("apollo-server-express").gql

const typeDefs = gql`
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
scalar Date
# This "Manga" type defines the queryable fields for every manga in our data source.
type Manga {
  id: ID!
  image: String
  title: String!
  hits: String
  lastUpdated: Date!
  info: MangaInfo
}

type MangaInfo {
  chapters: [Chapter!]!
  id: ID!
}

type Chapter{
  id: ID!
  title: String!
  lastUpdated: Date!
  number: String! 
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "mangas" query returns an array of zero or more Manga (defined above).
type Query {
  mangas(keyword: String ): [Manga!]!
  manga(id: ID!) : Manga!
}
`;
module.exports = typeDefs